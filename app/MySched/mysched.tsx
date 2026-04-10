import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import styles from "./mysched.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

const MySchedule = () => {
  const router = useRouter();
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.arrowBack}
          onPress={() => router.push("../../Home/home")}
        >
          <Image
            source={require("../../assets/images/arrowback.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>MY SCHEDULE</Text>
        </Pressable>
      </View>

      

      <BottomNav />
    </View>
  );
};

export default MySchedule;