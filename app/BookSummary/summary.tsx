import * as React from "react";
import { ScrollView, View, Text, Pressable, Image, Alert } from "react-native";
import styles from "./summary.styles";
import { useRouter } from "expo-router";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get, push, set, remove } from "firebase/database";

const paymentOptions = [
    { id: "qrph", name: "QRPH" },
    { id: "card", name: "Credit/Debit Card" },
    { id: "gcash", name: "GCash" },
];

const BookingSummary = () => {
    const router = useRouter();
    const userId = auth.currentUser?.uid;

    const [entrance, setEntrance] = React.useState<any>(null);
    const [rides, setRides] = React.useState<any>(null);

    const [paymentMethod, setPaymentMethod] = React.useState<string>("null");

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!userId) return;

        const snapshot = await get(ref(db, `bookings/${userId}`));

        if (!snapshot.exists()) return;

        const data = snapshot.val();

        const entranceList = Object.values(data.entranceTicket || {});
        const rideList = Object.values(data.ridesTicket || {});

        setEntrance(entranceList[entranceList.length - 1]);
        setRides(rideList[rideList.length - 1]);
    };

    const formatTickets = (tickets: any) => {
        if (!tickets) return "";

        return Object.entries(tickets)
            .filter(([_, val]) => val > 0)
            .map(([key, val]) => `${key} (${val})`)
            .join("; ");
    };

    const entranceTotal = entrance?.totalPrice || 0;
    const rideTotal = rides?.totalPrice || 0;
    const ridePoints = rides?.totalPoints || 0;
    const grandTotal = entranceTotal + rideTotal;

    const refNumber = () => `ATR-${Date.now()}`;

    const handlePayment = async () => {
        if (!userId) return;
    
        if (!paymentMethod || paymentMethod === "null") {
            Alert.alert("Error", "Please select a payment method");
            return;
        }
    
        Alert.alert(
            "Confirm Payment",
            `Proceed with payment of Php ${grandTotal.toFixed(2)}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Pay",
                    onPress: async () => {
                        const reference = refNumber();
                        const date = new Date().toISOString();
    
                        const bookingRef = push(ref(db, `transaction/${userId}`));
                        await set(bookingRef, {
                            entranceTicket: entrance,
                            ridesTicket: rides,
                            payment: {
                                reference,
                                payMethod: paymentMethod,
                                totalPay: grandTotal,
                                date,
                            },
                            collectedPoints: ridePoints,
                        });
    
                        await remove(ref(db, `cart/${userId}`));
    
                        router.push(`./receipt?ref=${reference}`);
                    }
                }
            ]
        );
    };

    if (!entrance && !rides) return null;

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Pressable 
                        style={styles.arrowBack} 
                        onPress={() => router.push('../../Cart/cart')} 
                    >
                    <Image
                        source={require('../../assets/images/arrowback.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                    <Text style={styles.subTitle}>Booking Summary</Text>
                </View>

                <View style={styles.divider}/>

                <View style={styles.cards}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10}}>Entrance Ticket</Text>
                    <Text style={{ fontSize: 18, textAlign: "right", marginBottom: 20 }}>{entrance?.date}</Text>
                    <Text style={{ fontSize: 16, textAlign: "right", textTransform: "capitalize", marginBottom: 5 }}>{formatTickets(entrance?.tickets)}</Text>
                    
                    <View style={{ flexDirection: "row",justifyContent: "space-between", marginTop: 5 }}>
                        <Text style={styles.texts}>TOTAL: </Text>
                        <Text style={styles.texts}>Php {entranceTotal.toFixed(2)}</Text>
                    </View>
                </View>
                
                <View style={styles.cards}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>Reserved Rides</Text>

                    {rides?.rides?.map((ride: any) => (
                        <View key={ride.id} style={styles.rideRes}>
                            <Text style={{ fontSize: 15, marginBottom: 5 }}>
                                {ride.name} (x{ride.quantity})
                            </Text>

                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                             Php {ride.totalPrice ?? ride.price * ride.quantity}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.divider}/>
                

                <View style={styles.methodCard}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Select Payment Method</Text>
                    {paymentOptions.map((option) => (
                        <Pressable
                        key={option.id}
                        onPress={() => setPaymentMethod(option.id)}
                        style={{
                            padding: 15,
                            borderWidth: paymentMethod === option.id ? 2 : 1,
                            borderColor: paymentMethod === option.id ? "#CE9E00" : "#ccc",
                            marginBottom: 10,
                            borderRadius: 10,
                        }}
                        >
                        <Text>{option.name}</Text>
                        </Pressable>
                    ))}
                </View>
                
                <View style={[styles.cards, { backgroundColor: "#87cbde",padding: 40}]}>
                    <View style={styles.totalView}>
                        <Text style={[styles.texts, {fontWeight: "500", fontSize: 15, marginBottom: 20 }]}>Entrance Fee: </Text>
                        <Text style={styles.texts}>Php {entranceTotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.totalView}>
                        <Text style={[styles.texts, {fontWeight: "500", fontSize: 15, marginBottom: 20 }]}>Ride Add-ons: </Text>
                        <Text style={styles.texts}>Php {rideTotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.totalView}>
                        <Text style={[styles.texts, {fontWeight: "500", fontSize: 15}]}>Collected Points: </Text>
                        <Text style={styles.texts}>{ridePoints}</Text>
                    </View>

                    <View style={[styles.divider, { margin: 30 }]}/>

                    <View style={styles.totalView}>
                        <Text style={[styles.texts, {fontSize: 30}]}>TOTAL: </Text>
                        <Text style={[styles.texts, {fontSize: 30}]}>Php {grandTotal.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View>
                <Pressable style={styles.pOrderBtn} onPress={handlePayment}>
                    <Text style={styles.pOrderTxt}>PLACE ORDER</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default BookingSummary;