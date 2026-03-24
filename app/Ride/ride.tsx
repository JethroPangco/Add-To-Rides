import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
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
import Sidebar from "../Navigation/Sidebar";
import BottomNav from "../Navigation/BottomNav";

const RideReservation = () => {
  const { width } = Dimensions.get("window");
  const SIDEBAR_WIDTH = width * 0.75;
  const router = useRouter();

  const [category, setCategory] = useState("exciting");
  const [search, setSearch] = useState("");

  const sidebarX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rides = [
    //Exciting
    {
      id: "1",
      name: "WHEEL OF FATE",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "All Ages | No height limit | 5-7 minutes",
      image: require("../../assets/exciting/wheel-of-fate.jpg"),
    },
    {
      id: "2",
      name: "JUNGLE LOG JAM",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "6+ | 117 cm minimum | 3-4 minutes",
      image: require("../../assets/exciting/jungle-log.jpg"),
    },
    {
      id: "3",
      name: "RIO GRANDE RAPIDS",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "6+ | 107 cm minimum | 4-5 minutes",
      image: require("../../assets/exciting/rio-grande.jpg"),
    },
    {
      id: "4",
      name: "THE GRAND CAROUSEL",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "All Ages | No height limit | 2-3 minutes",
      image: require("../../assets/exciting/carousel.png"),
    },

    {
      id: "5",
      name: "AIR PTERODACTYL",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "3+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/exciting/air-pterodactyle.jpg"),
    },
    {
      id: "6",
      name: "RIALTO",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "All Ages | No height limit | 10-15 minutes",
      image: require("../../assets/exciting/rialto.jpg"),
    },

    {
      id: "7",
      name: "AGILA: THE EXPERIENCE",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "5+ | No height limit | 10 minutes",
      image: require("../../assets/exciting/agila.png"),
    },
    {
      id: "8",
      name: "UP, UP AND AWAY",
      category: "exciting",
      label: "Exciting / Family / Kiddy",
      details: "4+ | 109 cm minimum | 3-4 minutes",
      image: require("../../assets/exciting/up-away.jpg"),
    },

    //Thrilling
    {
      id: "1",
      name: "EKLIPSE",
      category: "thrilling",
      label: "Thrilling",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/thrilling/eklipse.jpg"),
    },
    {
      id: "2",
      name: "EKSTREME TOWER",
      category: "thrilling",
      label: "Thrilling / Extreme",
      details: "12+ | 117 cm minimum | 3-4 minutes",
      image: require("../../assets/thrilling/ekstreme.png"),
    },
    {
      id: "3",
      name: "ANCHORS AWAY",
      category: "thrilling",
      label: "Thrilling",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/thrilling/anchors-away.png"),
    },
    {
      id: "4",
      name: "ROLLER SKATER",
      category: "thrilling",
      label: "Thrilling",
      details: "6+ | 107 cm minimum | 2 minutes",
      image: require("../../assets/thrilling/roller-skater.jpg"),
    },
    {
      id: "5",
      name: "FLYING FIESTA",
      category: "thrilling",
      label: "Thrilling",
      details: "8+ | 122 cm minimum | 3 minutes",
      image: require("../../assets/thrilling/flying.jpg"),
    },
    {
      id: "6",
      name: "AIR RACE",
      category: "thrilling",
      label: "Thrilling / Extreme",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/thrilling/air-race.jpg"),
    },
    {
      id: "7",
      name: "TWIN SPIN",
      category: "thrilling",
      label: "Thrilling / Extreme",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/thrilling/twin-spin.jpg"),
    },
    {
      id: "8",
      name: "BUMP N' SPLASH",
      category: "thrilling",
      label: "Thrilling",
      details: "10+ | 122 cm minimum | 3 minutes",
      image: require("../../assets/thrilling/bump.jpg"),
    },
    
    //Extreme
    {
      id: "1",
      name: "SPACE SHUTTLE",
      category: "extreme",
      label: "Extreme",
      details: "12+ | 122 cm minimum | 2 minutes",
      image: require("../../assets/extreme/space-shuttle.jpg"),
    },
    {
      id: "2",
      name: "EKSTREME TOWER",
      category: "extreme",
      label: "Thrilling / Extreme",
      details: "12+ | 117 cm minimum | 3-4 minutes",
      image: require("../../assets/extreme/ekstreme.png"),
    },
    {
      id: "3",
      name: "DISK-O-MAGIC",
      category: "extreme",
      label: "Extreme",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/extreme/disk.jpg"),
    },
    {
      id: "4",
      name: "FUN KART",
      category: "extreme",
      label: "Extreme",
      details: "10+ | 120 cm minimum | 5-7 minutes",
      image: require("../../assets/extreme/fun-kart.jpg"),
    },
    {
      id: "5",
      name: "XTREME PAINTBALL",
      category: "extreme",
      label: "Extreme",
      details: "12+ | No Age Limit | 10-15 minutes",
      image: require("../../assets/extreme/xpp01.jpg"),
    },
    {
      id: "6",
      name: "AIR RACE",
      category: "extreme",
      label: "Thrilling / Extreme",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/extreme/air-race.jpg"),
    },
    {
      id: "7",
      name: "TWIN SPIN",
      category: "extreme",
      label: "Thrilling / Extreme",
      details: "10+ | 122 cm minimum | 2-3 minutes",
      image: require("../../assets/extreme/twin-spin.jpg"),
    },
  ];

  const filtered = rides.filter(
    (ride) =>
      ride.category === category &&
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

        <View style={styles.cardText}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.label}</Text>
          <Text style={styles.details}>{item.details}</Text>
        
          <Pressable onPress={() => alert(item.name)}>
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
          <Pressable onPress={openSidebar}>
            <Image
              source={require("../../assets/icons/menu-bar.png")}
              style={styles.headerIcon}
            />
          </Pressable>

          <Text style={styles.headerTitle}>Ride Reservation</Text>

          <View style={styles.topRightIcons}>
            <Image
              source={require("../../assets/icons/cart.png")}
              style={styles.headerIcon}
            />
            <Image
              source={require("../../assets/icons/notif.png")}
              style={styles.headerIcon}
            />
          </View>
        </View>
      </View>

      {sidebarOpen && (
        <Pressable style={styles.overlay} onPress={closeSidebar} />
      )}

        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            
            <View style={styles.category}>
              
              {/* SEARCH */}
              <View style={styles.infoBox}>
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {/* BUTTONS */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                {["exciting", "thrilling", "extreme"].map((item) => (
                  <Pressable key={item} onPress={() => setCategory(item)}>
                    <Text
                      style={{
                        fontWeight: category === item ? "bold" : "normal",
                        textDecorationLine:
                          category === item ? "underline" : "none",
                        color: category === item ? "#28b1ff" : "#000",
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CARDS */}
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        />

      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default RideReservation;