import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";
import styles from "../Home/home.styles";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getColor = (route: any) =>
    pathname.startsWith(route) ? "#0065af" : "#3a3b3d";

  return (
    <View style={styles.bottomNav}>

      {/* Reward */}
      <Pressable
        style={styles.navItem}
        onPress={() => router.push("../Reward/reward")}
      >
        <Image
          source={require("../../assets/icons/reward.png")}
          style={[styles.navIcon, { tintColor: getColor("/Reward") }]}
        />
        <Text style={{ color: getColor("/Reward"), fontSize: 12 }}>
          Reward
        </Text>
      </Pressable>

      {/* Ticket */}
      <Pressable
        style={styles.navItem}
        onPress={() => router.push("../EntranceTicket/enticket")}
      >
        <Image
          source={require("../../assets/icons/ent-ticket.png")}
          style={[styles.navIcon, { tintColor: getColor("/EntranceTicket") }]}
        />
        <Text style={{ color: getColor("/EntranceTicket"), fontSize: 12 }}>
          Ticket
        </Text>
      </Pressable>

      {/* Home */}
      <Pressable
        style={styles.navItem}
        onPress={() => router.push("../../Home/home")}
      >
        <Image
          source={require("../../assets/icons/home-icon.png")}
          style={[styles.navIcon, { tintColor: getColor("/Home") }]}
        />
        <Text style={{ color: getColor("/Home"), fontSize: 12 }}>
          Home
        </Text>
      </Pressable>

      {/* Ride */}
      <Pressable
        style={styles.navItem}
        onPress={() => router.push("../../Ride/ride")}
      >
        <Image
          source={require("../../assets/icons/ride-reserv.png")}
          style={[styles.navIcon, { tintColor: getColor("/Ride") }]}
        />
        <Text style={{ color: getColor("/Ride"), fontSize: 12 }}>
          Rides
        </Text>
      </Pressable>

      {/* Profile */}
      <Pressable
        style={styles.navItem}
        onPress={() => router.push("../../UserProfile/user")}
      >
        <Image
          source={require("../../assets/icons/user-setting.png")}
          style={[styles.navIcon, { tintColor: getColor("/UserProfile") }]}
        />
        <Text style={{ color: getColor("/UserProfile"), fontSize: 12 }}>
          Profile
        </Text>
      </Pressable>

    </View>
  );
};

export default BottomNav;