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
  ImageBackground,
  Alert
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
  const [redeemedMap, setRedeemedMap] = useState<Record<string, boolean>>({});

  React.useEffect(() => {

    const loadPoints = async () => {
      const total = await fetchPoints();
      setPoints(total);
    };
  
    loadPoints();
    
    const loadRedeemed = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
  
      const snap = await get(ref(db, `redeemedRewards/${userId}`));
  
      let map: Record<string, boolean> = {};
  
      if (snap.exists()) {
        const data = snap.val();
  
        Object.values(data).forEach((reward: any) => {
          reward.items?.forEach((item: any) => {
            map[item.name] = true; 
          });
        });
      }
  
      setRedeemedMap(map);
    };
  
    loadRedeemed();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
  
      const total = await fetchPoints();
      setPoints(total);
      loadRedeemed();
    });
  
    return unsubscribe;
  }, []);

  const fetchPoints = async () => {
    if (!auth.currentUser) return 0;

    const userId = auth.currentUser.uid;

    const [snapPoints, redeemSnap] = await Promise.all([
      get(ref(db, `transaction/${userId}`)),
      get(ref(db, `redeemedRewards/${userId}`))
    ]);

    let earned = 0;
    let spent = 0;

    if (snapPoints.exists()) {
      const transaction = Object.values(snapPoints.val());

      earned = transaction.reduce(
        (sum: number, t: any) =>
          sum + (t.ridesTicket?.totalPoints || 0),
        0
      );
    }

    if (redeemSnap.exists()) {
      const redeemed = Object.values(redeemSnap.val());

      spent = redeemed.reduce(
        (sum: number, r: any) =>
          sum + (r.totalPointsUsed || r.pointsUsed || 0),
        0
      );
    }

    return Math.max(0, earned - spent);
  };
  
  const handleRedeem = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
  
    const selectedItems = rewards
      .filter(item => !item.comingSoon && (quantities[item.id] || 0) > 0)
      .map(item => ({
        name: item.name,
        quantity: quantities[item.id],
        cost: item.points,
        total: (item.points || 0) * (quantities[item.id] || 0),
        status: "redeemed"
      }));
  
    if (selectedItems.length === 0) {
      alert("Select at least 1 item");
      return;
    }
  
    const totalCost = selectedItems.reduce((sum, i) => sum + i.total, 0);
    const currentPoints = await fetchPoints();
  
    if (currentPoints < totalCost) {
      alert("Not enough points");
      return;
    }

    const now = new Date();
    const hour = now.getHours();

    if (hour < 11 || hour >= 20) {
      alert("You can only redeem between 11:00 AM and 8:00 PM");
      return;
    }
  
    Alert.alert(
      "Confirm Redemption",
      `Redeem ${selectedItems.length} item(s)?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            const refNum = `RR-${Date.now()}`;

            const redeemedAt = new Date();
            const expiresAt = new Date();
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);

            const remaining = currentPoints - totalCost;
            
            const itemChecks = await Promise.all(
              selectedItems.map(item =>
                get(ref(db, `redeemedItems/${userId}/${item.name}`))
              )
            );
            
            const alreadyRedeemed = itemChecks.some(snap => snap.exists());
            
            if (alreadyRedeemed) {
              Alert.alert("Error", "One or more items already redeemed.");
              return;
            }

            const newRef = push(ref(db, `redeemedRewards/${userId}`));
  
            await set(newRef, {
              items: selectedItems.map(i => ({
                ...i,
                status: "redeemed",
              })),
              totalPointsUsed: totalCost,
              remainingPoints: remaining,
              redeemedAt: redeemedAt.toISOString(),
              expiresAt: expiresAt.toISOString(),
              refNo: refNum,
            });

            for (const item of selectedItems) {
              await set(ref(db, `redeemedItems/${userId}/${item.name}`), {
                status: "redeemed",
                redeemedAt: redeemedAt.toISOString(),
                expiresAt: expiresAt.toISOString(),
              });
            }
  
            setPoints(remaining);
            setQuantities({});
  
            router.push({
              pathname: "./rew-receipt",
              params: { ref: newRef.key }
            });
          }
        }
      ]
    );
  };
  
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const changeQty = (id: number, increment: boolean) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      let value = increment ? current + 1 : current - 1;
  
      if (value < 0) value = 0;
      if (value > 1) value = 1;
  
      return { ...prev, [id]: value };
    });
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
          
          <Pressable
              style={styles.rewardBtn}
            onPress={handleRedeem}
          >
            <Text style={styles.rewardBtnText}>
              REDEEM ALL
            </Text>
          </Pressable>

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

          const isRedeemed = redeemedMap[item.name];
          const canRedeem = item.points && points >= item.points && !isRedeemed;
          
          return (
            <View key={item.id} style={styles.rewardCard}>
              
              <Image source={item.image} style={styles.rewardImage} />

              <View style={styles.rewardInfo}>
                <Text style={styles.rewardName}>{item.name}</Text>
                <Text style={styles.rewardPoints}>
                  {item.points} Points
                </Text>

                <View style={styles.redeemQty}>
                  <Pressable onPress={() => !redeemedMap[item.name] && changeQty(item.id, false)}
                    disabled={redeemedMap[item.name]}>
                    <Text style={styles.qtyBtn}>-</Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 10, color: "#fff", fontWeight: "bold"}}>
                    {quantities[item.id] || 0}
                  </Text>

                  <Pressable onPress={() => !redeemedMap[item.name] && changeQty(item.id, true)}
                      disabled={redeemedMap[item.name]}>
                    <Text style={styles.qtyBtn}>+</Text>
                  </Pressable>
                </View>

                  <Text style={[styles.redeemIndicator, styles.rewardBtnText, { backgroundColor: isRedeemed ? "#555" : canRedeem ? "#02dc35" : "#dc0202"}]}>
                    STATUS: { isRedeemed ? "Redeemed"
                               : canRedeem ? "Redeemable" : "Earn More"
                            }
                  </Text>

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