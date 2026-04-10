import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "../Home/home.styles";

const BottomNav = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>

      <Pressable style={styles.navItem} onPress={() => router.push('../Reward/reward')}>
        <Image
          source={require("../../assets/icons/reward.png")}
          style={styles.navIcon}
        />
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => router.push('../EntranceTicket/enticket')}>
        <Image
          source={require("../../assets/icons/ent-ticket.png")}
          style={styles.navIcon}
        />
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => router.push('../../Home/home')}>
        <Image
          source={require("../../assets/icons/home-icon.png")}
          style={styles.navIcon}
        />
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => router.push('../../Ride/ride')}>
        <Image
          source={require("../../assets/icons/ride-reserv.png")}
          style={styles.navIcon}
        />
      </Pressable>

      <Pressable onPress={() => router.push('../../UserProfile/user')} style={styles.navItem} >
        <Image
          source={require("../../assets/icons/user-setting.png")}
          style={styles.navIcon}
        />
      </Pressable>

    </View>
  );
};

export default BottomNav;