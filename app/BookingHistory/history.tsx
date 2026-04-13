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

  const [cancelledBookings, setCancelledBookings] = React.useState<any[]>([]);
  const [redeemedRewards, setRedeemedRewards] = React.useState<any[]>([]);

  const [activeTab, setActiveTab] = React.useState<"rides" | "entrance" | "points" | "cancelled">("rides");

  
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

      const cancelSnap = await get(ref(db, `cancelledBookings/${userId}`));
      let cancelData: any[] = [];

      if (cancelSnap.exists()) {
        cancelData = Object.values(cancelSnap.val()).reverse();
      }

      const redeemSnap = await get(ref(db, `redeemedRewards/${userId}`));
      let redeemData: any[] = [];

      if (redeemSnap.exists()) {
        redeemData = Object.entries(redeemSnap.val())
        .map(([key, value]: any) => ({
          ...value,
          key, 
        }))
        .reverse();
      }

      setTransactions(transData);
      setEntranceBookings(entranceData);
      setCancelledBookings(cancelData);
      setRedeemedRewards(redeemData);
    } catch (error) {
      console.log(error);
    }
  };
  
  const format12hr = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const shortRef = (ref: string) => {
    if (!ref) return "";
    return `${ref.slice(0, 2)}-${ref.slice(-4)}`;
  };

  const getStatus = (item: any) => {
    const now = new Date();
    const validFrom = new Date(item.bookedAt || item.payment?.date);
    const validUntil = new Date(item.validUntil || item.entranceTicket?.validUntil);

    if (now < validFrom) return "UPCOMING";
    if (now > validUntil) return "EXPIRED";
    return "VALID";
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "VALID":
        return "green";
      case "UPCOMING":
        return "orange";
      case "EXPIRED":
        return "red";
      default:
        return "#000";
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
          type: "earned",
          points: tx.collectedPoints,
          earnedAt: tx.payment?.date,
          ref: tx.payment?.reference,
        });
      }
    });

    redeemedRewards.forEach((r: any) => {
      pointsItems.push({
        type: "redeemed",
        points: -Math.abs(r.totalPointsUsed || r.points),
        earnedAt: r.redeemedAt || r.date,
        ref: r.key,
        reward: r,
      });
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

  const cancelledData = cancelledBookings;
  
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

      <View style={styles.touchTabs}>
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

        <TouchableOpacity onPress={() => setActiveTab("cancelled")}>
          <Text style={{ fontWeight: activeTab === "cancelled" ? "bold" : "normal" }}>
            Cancelled
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
            <View style={styles.backgroundContainer}>
              
              {/* REFERENCE */}
              <Text style={styles.txtHeader}>
                Ref No: {shortRef(item.reference)}
              </Text>

              {/* TIME */}
              <Text style={{ marginLeft: 20, fontSize: 16 }}>
                Order Date: {format12hr(item.bookedAt)}
              </Text>

              {/* PAYMENT METHOD */}
              <Text style={{ marginLeft: 20, marginBottom: 5, textTransform: "capitalize" }}>
                Payment Method: {item.payment?.payMethod}
              </Text>

              {/* STATUS */}
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: statusColor(getStatus(item)),
                }}
              >
                Status: {getStatus(item)}
              </Text>

              {/* VIEW RECEIPT */}
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
                <Text style={{ fontSize: 10, fontStyle: "italic" }}>
                  Note: entrance tickets included
                </Text>
              </Text>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "../BookSummary/receipt",
                    params: { ref: item.reference },
                  })
                }
                style={styles.viewReceiptBtn}
              >
                <Text style={{ color: "#fff" }}>View Receipt</Text>
              </Pressable>
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
            <View style={styles.backgroundContainer}>
              <Text style={styles.txtHeader}>
                {new Date(item.createdAt).toDateString()}
              </Text>

              {item.tickets.map((ticket: any, idx: number) => (
                <View key={`${ticket.type}-${idx}`} style={styles.entContainer}>
                  <Text style={styles.entType}>{ticket.type}</Text>
                  <Text>Qty: {ticket.quantity}</Text>
                  <Text>Total: Php {ticket.totalPrice}</Text>
                  <Text>Scheduled Date: {format12hr(ticket.visitDate)}</Text>
                  <Text>Booked Time: {format12hr(ticket.createdAt)}</Text>
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
            <View style={styles.backgroundContainer}>
              <Text style={styles.txtHeader}>{item.date}</Text>

              {item.items.map((p: any, idx: number) => (
                <View
                  key={idx}
                  style={styles.ptsContainer}
                >
                  <Text>{format12hr(p.earnedAt)}</Text>
                  <Text
                    style={[
                      styles.ptsTxt,
                      { color: p.type === "redeemed" ? "red" : "green" },
                    ]}
                  >
                    {p.type === "redeemed" ? "-" : "+"}
                    {Math.abs(p.points)} Points
                  </Text>

                  {p.type === "redeemed" && (
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: "../Reward/rew-receipt",
                          params: { ref: p.ref },
                        })
                      }
                    >
                      <Text style={{ color: "blue", marginTop: 5 }}>
                        View
                      </Text>
                    </Pressable>
                  )}
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

      {/* CANCELLED */}
      {activeTab === "cancelled" && (
        <FlatList
          data={cancelledData}
          keyExtractor={(item, index) => item.payment?.reference || index.toString()}
          contentContainerStyle={styles.scroll}
          renderItem={({ item }) => {
            const rides = item.ridesTicket?.rides || [];

            return (
              <View style={styles.backgroundContainer}>

                {/* REFERENCE */}
                <Text style={styles.txtHeader}>
                  Ref No: {shortRef(item.payment?.reference)}
                </Text>

                {/* CANCEL TIME */}
                <Text style={{ marginLeft: 20, fontSize: 16 }}>
                  Cancelled At: {format12hr(item.cancelledAt)}
                </Text>

                {/* PAYMENT METHOD */}
                <Text style={{ marginLeft: 20, marginBottom: 5, textTransform: "capitalize" }}>
                  Payment Method: {item.payment?.payMethod}
                </Text>
                
                {/* STATUS */}
                <Text style={{ marginLeft: 20, marginBottom: 10, color: "red", fontWeight: "bold" }}>
                  Status: CANCELLED
                </Text>

                {/* RIDES (WITH IMAGES - FIXED) */}
                {rides.map((ride: any, idx: number) => {
                  const rideData = getRideDetails(ride.id);
                  if (!rideData) return null;

                  return (
                    <ImageBackground
                      key={`${item.payment?.reference}-${ride.id}-${idx}`}
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
                  <Text style={{ fontSize: 10, fontStyle: "italic" }}>
                    Note: entrance tickets included
                  </Text>
                </Text>

              </View>
            );
          }}
          ListEmptyComponent={() => (
            <View style={styles.noRec}>
              <Text>No cancelled bookings yet</Text>
            </View>
          )}
        />
      )}

      <BottomNav />
    </View>
  );
};

export default BookingHistory;