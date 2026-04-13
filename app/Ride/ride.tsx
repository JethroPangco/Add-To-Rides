import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import styles from "./ride.styles";
import rides from "./rideList";
import Sidebar from "../Navigation/Sidebar";
import BottomNav from "../Navigation/BottomNav";

const RideReservation = () => {
  const { width } = Dimensions.get("window");
  const SIDEBAR_WIDTH = width * 0.75;
  const router = useRouter();

  const { category: routeCateg } = useLocalSearchParams();

  const [category, setCategory] = useState(routeCateg ? routeCateg : "all");
  const [search, setSearch] = useState("");

  const sidebarX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = rides.filter(
    (ride) =>
      (category === "all" || ride.category === category) &&
      ride.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

        <View style={styles.cardText}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.label}</Text>
          <Text style={styles.details}>{item.age} | {item.height} | {item.duration}</Text>
        
          <Pressable onPress={() => 
              router.push({
                pathname: "./RideInfo/rideDeets",
                params: { id: item.id },
              })
              }>
            <Text style={styles.view}>View Details</Text>
          </Pressable>
        </View>
    </View>
  );


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

            <Text style={styles.headerTitle}>Ride Reservation</Text>
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

        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            
            <View style={styles.category}>
              
              {/* Search */}
              <View style={styles.infoBox}>
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChangeText={setSearch}
                  
                />
              </View>

              {/* Buttons */}
              <View style={styles.btn}>
                {["all", "exciting", "thrilling", "extreme"].map((item) => (
                  <Pressable key={item} onPress={() => setCategory(item)}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: category === item ? "#fff" : "#3a3b3d",
                        borderColor: category === item ? "#87cbde" : "#3a3b3d",
                        borderWidth: 3,
                        padding: 4,
                        paddingRight: 10,
                        paddingLeft: 10,
                        borderRadius: 20,
                        fontSize: 17 
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Cards */}
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
          contentContainerStyle={styles.scrollContent}
        />

      {/* Bottom Nav */}
      <BottomNav />
    </View>
  );
};

export default RideReservation;