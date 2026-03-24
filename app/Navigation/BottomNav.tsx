import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "../Home/home.styles";

const BottomNav = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>

      <Pressable style={styles.navItem}>
        <Image
          source={require("../../assets/icons/reward.png")}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Reward</Text>
      </Pressable>

      <Pressable style={styles.navItem} >
        <Image
          source={require("../../assets/icons/ent-ticket.png")}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Ticket</Text>
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => router.push('../../Home/home')}>
        <Image
          source={require("../../assets/icons/home-icon.png")}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Home</Text>
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => router.push('../../Ride/ride')}>
        <Image
          source={require("../../assets/icons/ride-reserv.png")}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Ride Reserv</Text>
      </Pressable>

      <Pressable onPress={() => router.push('../../UserProfile/user')} style={styles.navItem} >
        <Image
          source={require("../../assets/icons/user-setting.png")}
          style={styles.navIcon}
          
        />
        <Text style={styles.navText}>Profile</Text>
      </Pressable>

    </View>
  );
};

export default BottomNav;