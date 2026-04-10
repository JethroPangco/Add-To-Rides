import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./history.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";
import ridesList from "../Ride/rideList";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

const BookingHistory = () => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;

  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [entranceBookings, setEntranceBookings] = React.useState<any[]>([]);
  const [activeTab, setActiveTab] = React.useState<"rides" | "entrance" | "points">("rides");

  React.useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    if (!userId) return;

    try {
      const transSnap = await get(ref(db, `transaction/${userId}`));
      let transData: any[] = [];

      if (transSnap.exists()) {
        transData = Object.values(transSnap.val()).reverse();
      }

      const bookingSnap = await get(ref(db, `bookings/${userId}`));
      let entranceData: any[] = [];

      if (bookingSnap.exists()) {
        const bookings = bookingSnap.val();
        entranceData = Object.values(bookings.entranceTicket || {}).reverse();
      }

      setTransactions(transData);
      setEntranceBookings(entranceData);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryColors: any = {
    exciting: "#1e90ff",
    thrilling: "#28a745",
    extreme: "#dc3545",
  };

  const getRideDetails = (id: string) => {
    return ridesList.find((r) => r.id === id);
  };

  const groupByDate = (items: any[], dateKey: string) => {
    const grouped: any = {};
    items.forEach((item) => {
      const date = new Date(item[dateKey]).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return grouped;
  };

  const groupEntranceByCreatedAt = (items: any[]) => {
    const grouped: any = {};
    items.forEach((item) => {
      const key = item.createdAt;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  };

  const ridesReference: any = {};
  const entranceItems: any[] = [];
  const pointsItems: any[] = [];

  if (transactions.length > 0) {
    transactions.forEach((tx: any, index: number) => {
      const refNum = tx.payment?.reference || `no-ref-${index}`;

      if (tx.ridesTicket?.rides?.length) {
        if (!ridesReference[refNum]) {
          ridesReference[refNum] = {
            reference: refNum,
            bookedAt: tx.payment?.date,
            payment: tx.payment,
            rides: [],
          };
        }
        tx.ridesTicket.rides.forEach((ride: any) => {
          ridesReference[refNum].rides.push(ride);
        });
      }

      if (tx.collectedPoints) {
        pointsItems.push({
          points: tx.collectedPoints,
          earnedAt: tx.payment?.date,
        });
      }
    });
  }

  if (entranceBookings.length > 0) {
    entranceBookings.forEach((entry) => {
      const tickets = entry.tickets || {};

      Object.keys(tickets).forEach((type) => {
        if (tickets[type] > 0) {
          entranceItems.push({
            type,
            quantity: tickets[type],
            totalPrice: entry.totalPrice,
            createdAt: entry.createdAt,
            visitDate: entry.date,
          });
        }
      });
    });
  }

  const entranceByBooking = groupEntranceByCreatedAt(entranceItems);
  const pointsByDate = groupByDate(pointsItems, "earnedAt");

  const ridesData = Object.values(ridesReference);
  const entranceData = Object.keys(entranceByBooking).map((key) => ({
    createdAt: key,
    tickets: entranceByBooking[key],
  }));
  const pointsData = Object.keys(pointsByDate).map((key) => ({
    date: key,
    items: pointsByDate[key],
  }));

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
          <Text style={styles.headerTitle}>BOOKING HISTORY</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 120,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => setActiveTab("rides")}>
          <Text style={{ fontWeight: activeTab === "rides" ? "bold" : "normal" }}>
            Rides Ticket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("entrance")}>
          <Text style={{ fontWeight: activeTab === "entrance" ? "bold" : "normal" }}>
            Entrance Ticket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("points")}>
          <Text style={{ fontWeight: activeTab === "points" ? "bold" : "normal" }}>
            Points Earned
          </Text>
        </TouchableOpacity>
      </View>

      {/* RIDES */}
      {activeTab === "rides" && (
        <FlatList
          data={ridesData}
          keyExtractor={(item: any) => item.reference}
          contentContainerStyle={styles.scroll}
          renderItem={({ item }: { item: any }) => (
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.txtHeader}>Ref: {item.reference}</Text>

              <Text style={{ marginLeft: 20, fontSize: 16 }}>
                {new Date(item.bookedAt).toDateString()} |{" "}
                {new Date(item.bookedAt).toLocaleTimeString()}
              </Text>

              <Text style={{ marginLeft: 20, marginBottom: 10 }}>
                Method: {item.payment?.payMethod.toUpperCase()}
              </Text>

              {item.rides.map((ride: any, idx: number) => {
                const rideData = getRideDetails(ride.id);
                if (!rideData) return null;

                return (
                  <ImageBackground
                    key={`${item.reference}-${ride.id}-${idx}`}
                    source={rideData.image}
                    style={styles.imgBg}
                  >
                    <View
                      style={[
                        styles.overflow,
                        { backgroundColor: categoryColors[rideData.category] },
                      ]}
                    />
                    <View style={styles.imgTxt}>
                      <Text style={styles.imgTxt2}>
                        {rideData.name} (x{ride.quantity})
                      </Text>
                      <Text style={[styles.imgTxt2, { fontWeight: "normal" }]}>
                        Php {ride.totalPrice ?? rideData.price * ride.quantity}
                      </Text>
                    </View>
                  </ImageBackground>
                );
              })}

              <Text style={styles.totalTxt}>
                Total: Php {item.payment?.totalPay}{" "}
                <Text style={{ fontSize: 10, fontStyle: "italic", fontWeight: "normal" }}>
                  Note: entrance tickets included
                </Text>
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.noRec}>
              <Text>No ride booking history yet</Text>
            </View>
          )}
        />
      )}

      {/* ENTRANCE */}
      {activeTab === "entrance" && (
        <FlatList
          data={entranceData}
          keyExtractor={(item) => item.createdAt}
          contentContainerStyle={styles.scroll}
          renderItem={({ item }: { item: any }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.txtHeader}>
                {new Date(item.createdAt).toDateString()}
              </Text>

              {item.tickets.map((ticket: any, idx: number) => (
                <View key={`${ticket.type}-${idx}`} style={styles.entContainer}>
                  <Text style={styles.entType}>{ticket.type}</Text>
                  <Text>Qty: {ticket.quantity}</Text>
                  <Text>Total: Php {ticket.totalPrice}</Text>
                  <Text>Scheduled Date: {ticket.visitDate}</Text>
                  <Text>
                    Booked Time:{" "}
                    {new Date(ticket.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
              ))}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.noRec}>
              <Text>No entrance booking history yet</Text>
            </View>
          )}
        />
      )}

      {/* POINTS */}
      {activeTab === "points" && (
        <FlatList
          data={pointsData}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.scroll}
          renderItem={({ item }: { item: any }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.txtHeader}>{item.date}</Text>

              {item.items.map((p: any, idx: number) => (
                <View
                  key={idx}
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text style={[styles.ptsTxt, { color: "#000" }]}>
                    {new Date(p.earnedAt).toLocaleTimeString()}
                  </Text>

                  <Text style={styles.ptsTxt}>
                    + {p.points} Points
                  </Text>
                </View>
              ))}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.noRec}>
              <Text>No points history yet</Text>
            </View>
          )}
        />
      )}

      <BottomNav />
    </View>
  );
};

export default BookingHistory;