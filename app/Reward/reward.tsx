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
  ImageBackground
} from "react-native";
import styles from "./reward.styles";
import Sidebar from "../Navigation/Sidebar";
import BottomNav from "../Navigation/BottomNav";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get, push, set } from "firebase/database";

const Reward = () => {
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

  const rewards = [
    {
      id: 1,
      name: "EK T-Shirt",
      points: 300,
      image: require("../../assets/rewards/shirt.jpg"),
    },
    {
      id: 2,
      name: "EK Plushie",
      points: 1000,
      image: require("../../assets/rewards/stuff.jpg"),
    },
    {
      id: 3,
      name: "EK Hat",
      points: 1300,
      image: require("../../assets/rewards/hat.jpg"),
    },
    {
      id: 4,
      name: "EK Bag",
      points: 1500,
      image: require("../../assets/rewards/bag.jpg"),
    },
    {
      id: 5,
      comingSoon: true,
      image: require("../../assets/rewards/more.jpg"),
    },
  ];  
  
  const [points, setPoints] = useState(0);

  React.useEffect(() => {
    const loadPoints = async () => {
      const total = await fetchPoints();
      setPoints(total);
    };
    loadPoints();
  }, []);

  const fetchPoints = async () => {
    if (!auth.currentUser) return 0;
    const userId = auth.currentUser.uid;
  
    const snapPoints = await get(ref(db, `transaction/${userId}`));
    let totalPoints = 0;
  
    if (snapPoints.exists()){
      const transaction = Object.values(snapPoints.val());
      totalPoints = transaction.reduce((sum: number, t: any) => sum + (t.ridesTicket?.totalPoints || 0), 0);
    }
  
    const redeemSnap = await get(ref(db, `redeemedRewards/${userId}`));
    if (redeemSnap.exists()) {
      const redeemed = Object.values(redeemSnap.val());
      const redeemedPoints = redeemed.reduce((sum: number, r: any) => sum + (r.pointsUsed || 0), 0);
      totalPoints -= redeemedPoints; 
    }
  
    return totalPoints;
  };

  const handleRedeem = async (itemName: string, cost: number) => {
    const userId = auth.currentUser?.uid;
    if(!userId) return;

    const totalPoints = await fetchPoints();
    if (totalPoints < cost) {
      alert("Not enough points");
      return;
    }
    
    const confirmationCode = `RR-${Date.now()}-ATR-${Math.floor(Math.random() * 99)}`;
    const redeemedAt = new Date().toISOString();
  
    const newRef = push(ref(db, `redeemedRewards/${userId}`));
    await set(newRef, {
      itemName,
      pointsUsed: cost,
      redeemedAt,
      confirmationCode,
    });

    const total = await fetchPoints();
    setPoints(total);

    alert(`Redeemed successfully! Confirmation: ${confirmationCode}`);
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

            <Text style={styles.headerTitle}>Reward System</Text>
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
        <ImageBackground 
            source={require("../../assets/rewards/ek.png")} 
            style={styles.pointsCard}
            resizeMode="cover"
            >
              <View style={styles.cardOverlay}>
                <Text style={styles.pointsTitle}>CONGRATULATIONS!</Text>
                <Text style={[styles.pointsTitle, {fontSize: 15}]}>You have currently earned:</Text>
                <Text style={styles.pointsValue}>{points}</Text>
                <Text style={styles.pointsLabel}>Points</Text>
                <Text style={styles.pointsDesc}>Ride more to earn</Text>
                <Text style={styles.pointsDesc}>more points = more prizes</Text>
              </View>
        </ImageBackground>

        <View style={{margin: 30}}>
          <Text style={styles.sectionTitle}>Redeem Center</Text>
          
          <View style={styles.divider} />
      
          {rewards.map((item) => {

          if (item.comingSoon) {
            return (
            <View key={item.id} style={styles.rewardCard}>
              
              <Image source={item.image} style={styles.rewardImage} />

              <View style={styles.rewardInfo}>
                <Text style={styles.rewardName}>More Incoming!</Text>
              </View>
            </View>
            );
          }

          const canRedeem = item.points && points >= item.points;
          return (
            <View key={item.id} style={styles.rewardCard}>
              
              <Image source={item.image} style={styles.rewardImage} />

              <View style={styles.rewardInfo}>
                <Text style={styles.rewardName}>{item.name}</Text>
                <Text style={styles.rewardPoints}>
                  {item.points} Points
                </Text>

                <Pressable
                  style={[
                    styles.rewardBtn,
                    { backgroundColor: canRedeem ? "#02dc35" : "#dc0202" },
                  ]}
                  onPress={() => handleRedeem(item.name!, item.points!)}
                >
                  <Text style={styles.rewardBtnText}>
                    {canRedeem ? "REDEEM" : "EARN MORE"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <BottomNav />
    </View>
  );
};

export default Reward;