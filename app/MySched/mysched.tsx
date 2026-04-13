import * as React from "react";
import { FlatList, View, Text, Pressable, Image, Alert } from "react-native";
import styles from "./mysched.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

import ridesData from "../Ride/rideList";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get, set, remove } from "firebase/database";

const MySchedule = () => {
  const router = useRouter();
  
  const [tab, setTab] = React.useState<"ongoing" | "soon"> ("ongoing");
  const [ongoing, setOngoing] = React.useState<any[]>([]);
  const [soon, setSoon] = React.useState<any[]>([]);

  React.useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const userId = auth.currentUser?.uid;

    if (!userId) 
      return; 

    const snapshot = await get(ref(db, `transaction/${userId}`));
    if (!snapshot.exists()) 
      return;

    const raw = Object.entries(snapshot.val()).map(([key, value]) => ({
        key,
        ...value,
    }));

    let grouped: any = {};

    raw.forEach((item: any) => {
      const key = item.payment?.reference;

      if(!grouped[key]) {
        grouped[key] = {
          ...item,
          rides: item.ridesTicket?.rides || [],
          key: item.key
        };
      } else {
        grouped[key].rides.push(...(item.ridesTicket?.rides || []));
      }
    });

    const currentDate = new Date();

    let occuring: any[] = [];
    let upcoming: any[] = [];

    Object.values(grouped).forEach((item: any) => {
      const valid = new Date(item.entranceTicket?.validFrom);
      const expiry = new Date(item.entranceTicket?.validUntil);

      const onGoingSched = (valid.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

      const isOngoing = onGoingSched <= 1;

      if (isOngoing) {
        occuring.push(item);
      } else {
        upcoming.push(item);
      }
    });

    occuring.sort((a, b) =>
      new Date(a.entranceTicket?.validFrom).getTime() - new Date(b.entranceTicket?.validFrom).getTime()
    );

    upcoming.sort((a, b) =>
      new Date(a.entranceTicket?.validFrom).getTime() - new Date(b.entranceTicket?.validFrom).getTime()
    );

    setOngoing(occuring);
    setSoon(upcoming);
  };

  const format12hr = (date: string) => {
    return new Date(date).toLocaleString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  };

  const getImage = (name: string) => {
    return ridesData.find(r => r.name === name)?.image;
  };
  const shortRef = (refNo: string) => {
    if (!refNo) return "";
    return `${refNo.slice(0, 2)}-${refNo.slice(-4)}`;
  };
  const openReceipt = (refNo: string) => {
    router.push({
      pathname: "../BookSummary/receipt",
      params: { ref: refNo }
    });
  };

  const cancelBooking = async (item: any, bookingKey: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const expiry = new Date(item.validUntil || item.entranceTicket?.validUntil);
    const valid = new Date();

    if (valid > expiry) {
      Alert.alert("Cannot Cancel", "Booking already expired.");
      return;
    }

    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            const bookingRef = ref(db, `transaction/${userId}/${bookingKey}`);
            const cancelled = ref(db, `cancelledBookings/${userId}/${bookingKey}`);
            
            const record = await get(bookingRef);
            if (!record.exists()) return;

            const info = record.val();

            await set(cancelled, {
              ...info,
              status: "Cancelled",
              cancelledAt: new Date().toISOString(),
            });

            await remove(bookingRef);

            Alert.alert("Cancelled", "Booking has been cancelled.");
            load();
          }
        }
      ]
    );
  };

  const ticketType = (tickets: any) => {
    const list = [
      { key: "regular", label: "Regular" },
      { key: "children", label: "Children" },
      { key: "student", label: "Student" },
      { key: "senior", label: "Senior/PWD" }
    ];

    return list
      .filter(t => tickets?.[t.key] > 0)
      .map((t, i) => (
        <Text key={i}>
          {t.label}: {tickets[t.key]}
        </Text>
      ));
  };

  const cardContainer = (item: any, index: number) => {
    const valid = new Date();
    const expiry = new Date(item.entranceTicket?.validUntil);

    const isExpired = valid > expiry;

    return (
      <View key={index} style={styles.card}>

        <Text>
          Ref No: {shortRef(item.payment?.reference)}
        </Text>

        <Text>
          Schedule: {format12hr(item.entranceTicket?.validFrom)}
        </Text>

        <Text style={[styles.status, {color: isExpired ? "red" : "green"}]}>
          Status: {isExpired ? "Expired" : "Valid"}
        </Text>

        <Text style={styles.section}>Entrance Ticket</Text>
        {ticketType(item.entranceTicket?.tickets)}

        <Text style={styles.section}>Rides Reserved</Text>

        {item.rides.map((r: any, i: number) => (
          <View key={i} style={styles.rideRow}>
            <Image source={getImage(r.name)} style={styles.rideImg} />
            <View>
              <Text>{r.name}</Text>
              <Text>x{r.quantity}</Text>
            </View>
          </View>
        ))}

        <Text style={{textAlign: "right"}}>
          Valid: {format12hr(item.entranceTicket?.validFrom)}
        </Text>

        <Text style={{textAlign: "right"}}>
          Expiry: {format12hr(item.entranceTicket?.validUntil)}
        </Text>

        <View style={styles.divider}/>

        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
          <Pressable
            style={styles.receiptBtn}
            onPress={() => openReceipt(item.payment?.reference)}
          >
            <Text style={{ color: "#fff" }}>VIEW RECEIPT</Text>
          </Pressable>

          <Pressable
            style={[
              styles.cancelBtn,
              isExpired && { backgroundColor: "#aaa" }
            ]}
            onPress={() => cancelBooking(item, item.key)}
            disabled={isExpired}
          >
            <Text style={{ color: "#fff" }}>
              {isExpired ? "CANNOT CANCEL" : "CANCEL BOOKING"}
            </Text>
          </Pressable>
        </View>
        

      </View>
    );
  };

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

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab("ongoing")}>
          <Text style={tab === "ongoing" ? styles.active : styles.tab}>
            Ongoing
          </Text>
        </Pressable>

        <Pressable onPress={() => setTab("soon")}>
          <Text style={tab === "soon" ? styles.active : styles.tab}>
            Upcoming
          </Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={styles.scroll}
        data={tab === "ongoing" ? ongoing : soon}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => cardContainer(item, index)}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ fontSize: 16, color: "gray" }}>
              No schedules found
            </Text>
          </View>
        )}
      />

      <BottomNav />
    </View>
  );
  
};

export default MySchedule;