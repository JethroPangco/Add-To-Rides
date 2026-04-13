import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  FlatList,
  Alert 
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./enticket.styles";
import Sidebar from "../Navigation/Sidebar";
import BottomNav from "../Navigation/BottomNav";

import { ref, get, update } from "firebase/database";
import { auth, db } from "../../src/config/firebaseConfig";

const EntranceTicket = () => {
    const { width } = Dimensions.get("window");
    const SIDEBAR_WIDTH = width * 0.75;
    const router = useRouter();
    const sidebarX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
        Animated.timing(sidebarX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    const closeSidebar = () => {
        Animated.timing(sidebarX, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
        }).start(() => setSidebarOpen(false));
    };

    const panResponder = React.useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => {
            if (!sidebarOpen && gesture.moveX < 30 && gesture.dx > 10) return true;
            if (sidebarOpen && gesture.dx < -10) return true;
            return false;
        },

        onPanResponderMove: (_, gesture) => {
            let newX = gesture.dx - SIDEBAR_WIDTH;
            if (sidebarOpen) newX = gesture.dx;

            if (newX > 0) newX = 0;
            if (newX < -SIDEBAR_WIDTH) newX = -SIDEBAR_WIDTH;

            sidebarX.setValue(newX);
        },

        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx > 100) openSidebar();
            else if (gesture.dx < -100) closeSidebar();
            else sidebarOpen ? openSidebar() : closeSidebar();
        },
        })
    ).current;

    const btnLogout = () => {
        router.replace("/Login/Login");
    };

    //Price Card 
    const priceCard = [
        {
            title: "🧑 Regular",
            subText: "",
            price: "Php 500",
            bgColor: "#ff8686"
        },
        {
            title: "👧 Children",
            subText: "age 3-11 years old",
            price: "Php 350",
            bgColor: "#ffed65"
        },
        {
            title: "🎒 Student",
            subText: "present valid ID",
            price: "Php 450",
            bgColor: "#91f5f9"
        },
        {
            title: "‍🧑‍🦼‍‍PWD/Senior",
            subText: "present valid ID",
            price: "Php 350",
            bgColor: "#9bff77"
        },
    ];

    // Date picker
    const [date, setDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Ticket selector
    type TicketType = "regular" | "children" | "student" | "senior";

    const [ticketCounts, setTicketCounts] = useState<Record<TicketType, number>>({
        regular: 0,
        children: 0,
        student: 0,
        senior: 0,
    });

    const ticketTypes: {id: TicketType; name: string; bgColor: string}[] = [
        { id: "regular", name: "Regular" , bgColor: "#ff8686"},
        { id: "children", name: "Children", bgColor: "#ffed65" },
        { id: "student", name: "Student", bgColor: "#91f5f9" },
        { id: "senior", name: "PWD/Senior", bgColor: "#9bff77"},
    ];

    const ticketPrices: Record<TicketType, number> = {
        regular: 500,
        children: 350,
        student: 450,
        senior: 350,
    };

    const MAX_TICKETS_PER_TYPE = 10;

    const handleChangeTicket = (type: TicketType, increment: boolean) => {
        setTicketCounts((prev) => {
            const current = prev[type];
            let newCount = increment ? current + 1 : current - 1;

            if (newCount < 0) newCount = 0;
            if (newCount > MAX_TICKETS_PER_TYPE) newCount = MAX_TICKETS_PER_TYPE;

            return { ...prev, [type]: newCount };
        });
    };

    const saveBooking = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                Alert.alert("Error", "User not logged in");
                return;
            }
        
            let totalPrice = 0;
            const selectedTickets: Record<TicketType, number> = {
                regular: 0,
                children: 0,
                student: 0,
                senior: 0
            };
            
            Object.keys(ticketCounts).forEach((type) => {
                const key = type as TicketType;
                if (ticketCounts[key] > 0) {
                selectedTickets[key] = ticketCounts[key];
                totalPrice += ticketCounts[key] * ticketPrices[key];
                }
            });
        
            if (Object.keys(selectedTickets).length === 0) {
                Alert.alert("Error", "Please select at least 1 ticket");
                return;
            }

            const bookingRef = ref(db, `bookings/${user.uid}`);
            const snapshot = await get(bookingRef);
        
            let entranceTicket: any[] = [];
            if (snapshot.exists()) {
                entranceTicket = snapshot.val().entranceTicket || [];
            }
            
            const schedDate = new Date(date);

            const validFrom = new Date(schedDate);
            validFrom.setHours(11, 0, 0);

            const validUntil = new Date(schedDate);
            validUntil.setHours(20, 0, 0);

            const newBooking = {
                date: schedDate.toDateString(),
                
                validFrom: validFrom.toISOString(),
                validUntil: validUntil.toISOString(),
                
                tickets: selectedTickets,
                totalPrice,
                createdAt: new Date().toISOString(),
                ridesBooked: snapshot.val()?.ridesTicket || [],
            };
        
            await update(bookingRef, {
                entranceTicket: [...entranceTicket, newBooking],
            });
        
            Alert.alert("Success", "Booking saved!");
            router.push("../Ride/ride");
        
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to save booking");
        }
      };

    const handleBooking = () => {
        if (!date) {
            Alert.alert("Missing Info", "Please select a date");
            return;
        }

        const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);

        if (totalTickets === 0) {
            Alert.alert("Missing Info", "Please select at least 1 ticket");
            return;
        }

        Alert.alert(
            "Confirm Booking",
            "Are you sure you want to proceed?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: saveBooking }
            ]
        );
    };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      
        {/* Sidebar */}
        <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: sidebarX }] }]}
        >
            <Sidebar btnLogout={btnLogout} />
        </Animated.View>

        {/* Header */}
        <View style={styles.header}>
            <View style={styles.topIcons}>

            <View style={styles.topLeft}>
                <Pressable onPress={openSidebar}>
                <Image
                    source={require("../../assets/icons/menu-bar.png")}
                    style={styles.headerIcon}
                />
                </Pressable>

                <Text style={styles.headerTitle}>Entrance Ticket</Text>
            </View>

            <Pressable style={styles.topRightIcons} onPress={() => router.push('../Cart/cart')}>
                <Image
                source={require("../../assets/icons/cart.png")}
                style={styles.headerIcon}
                />
                <Image
                source={require("../../assets/icons/notif.png")}
                style={styles.headerIcon}
                />
            </Pressable>
            </View>
        </View>

        {sidebarOpen && (
            <Pressable style={styles.overlay} onPress={closeSidebar} />
        )}

        <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <Text style={styles.subTitle}>
                Interested to go out and bond with your loved ones?
                <Text style={{fontWeight: "bold", fontStyle: "normal"}}> Book your tickets now!</Text>
            </Text>
            
            <View style={styles.deetsContainer}>
                <Text style={styles.deetsText}>TICKET FEES</Text>
    
                <View style={styles.divider} />
            </View>

            {/* Prices */}
            <FlatList
                data={priceCard}
                keyExtractor={(item) => item.title}
                numColumns={2}
                columnWrapperStyle={styles.priceCard}
                scrollEnabled={false}
                renderItem={({item}) => (
                    <View style={[styles.card, {backgroundColor: item.bgColor}]}>
                        <Text style={styles.cardText}>{item.title}</Text>
                        <Text style={styles.cardSubText}>{item.subText}</Text>
                        <Text style={styles.cardText}>{item.price}</Text>
                    </View>
                )}
            />

            <Text style={styles.text}>Please complete the required information below.</Text>

            {/* Desired Date */}
            <Text style={[styles.deetsText, {marginBottom: 10}]}>Select desired date</Text>
            <Pressable
                style={styles.inputCalendar}
                onPress={() => setShowDatePicker(true)}
            >
                <Image source={require("../../assets/icons/calendar.png")}
                    style={{height: 30, width: 30, alignSelf: "center"}}
                />
                <Text style={{alignSelf: "center"}}>{date ? date.toDateString() : "Select a date"}</Text>
            </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="calendar"
                        onValueChange={(_, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDate(selectedDate);
                        }}
                    />
                )}    

            {/* Ticket Type */}
            <Text style={[styles.deetsText, {marginBottom: 10}]}>Select ticket type</Text>
            <FlatList
                data={ticketTypes}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                <View style={[styles.ticketType, {backgroundColor: item.bgColor}]}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 5 }}>
                        <Pressable style={styles.qtyBtn} onPress={() => handleChangeTicket(item.id, false)}>
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>-</Text>
                        </Pressable>

                        <Text style={{ marginHorizontal: 15, fontSize: 18, fontWeight: "bold" }}>
                            {ticketCounts[item.id]}
                        </Text>

                        <Pressable style={styles.qtyBtn} onPress={() => handleChangeTicket(item.id, true)}>
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>+</Text>
                        </Pressable>
                    </View>
                </View>
                )}
            /> 
            <Pressable style={styles.proceed} onPress={handleBooking}>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                    PROCEED TO BOOKING
                </Text>
            </Pressable>

        </ScrollView>

      {/* Bottom Nav */}
      <BottomNav />
    </View>
  );
};

export default EntranceTicket;