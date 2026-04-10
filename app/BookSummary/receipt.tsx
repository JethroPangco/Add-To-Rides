import * as React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import styles from "./receipt.styles";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const Receipt = () => { 
    const router = useRouter();
  const { ref: refNo } = useLocalSearchParams();
  const userId = auth.currentUser?.uid;

  const [order, setOrder] = React.useState<any>(null);

  React.useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    if (!userId || !refNo) return;

    const snapshot = await get(ref(db, `transaction/${userId}`));
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    
    const matchedKey = Object.keys(data).find(
      (key) => data[key].payment?.reference === refNo
    );

    if (matchedKey) {
      setOrder(data[matchedKey]);
    }
  };

  const generateFile = async () => {
    if (!order) return;

    const html = `
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 30px 20px;
              background: white;
              max-width: 400px;
              margin: 0 auto;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
              margin-bottom: 20px;
              color: #333;
            }
            .uniqueRef {
              text-align: right;
              font-size: 16px;
              font-weight: 600;
              color: #666;
              margin-bottom: 5px;
            }
            .divider {
              border-bottom: 1px solid #ddd;
              margin: 20px -20px;
            }
            .subTitle {
              font-weight: bold;
              font-size: 18px;
              margin: 25px 0 10px 0;
            }
            .details {
              font-size: 16px;
              line-height: 1.4;
              margin-bottom: 5px;
            }
            .totals {
              font-size: 18px;
              font-weight: bold;
              text-align: right;
              margin-top: 5px;
              color: #333;
            }
            .rideRes {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 0.5px solid #eee;
            }
            .btn {
              margin-top: 25px;
              padding: 15px 20px;
              border-radius: 8px;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
              color: white;
              text-decoration: none;
              display: block;
            }
            .downloadBtn {
              background: #87cbde;
              margin-bottom: 10px;
            }
            .confirmBtn {
              background: #7a0000;
            }
          </style>
        </head>
        <body>
          <div class="title">RECEIPT | ADD-TO-RIDES </div>
          
          <div class="uniqueRef">Ref No: ${order.payment.reference}</div>
          <div class="uniqueRef">Date: ${order.payment.date}</div>

          <div class="divider"></div>

          <div class="subTitle">Entrance Ticket</div>
          <div class="details">${order.entranceTicket?.date || 'N/A'}</div>
          <div class="details" style="text-transform: capitalize;">
            ${order.entranceTicket?.tickets 
              ? Object.entries(order.entranceTicket.tickets)
                  .filter(([_, val]) => val > 0)
                  .map(([k, v]) => `${k} (${v})`).join('; ') 
              : 'None'}
          </div>
          <div class="totals">Php ${order.entranceTicket?.totalPrice || 0}</div>

          <div class="divider"></div>

          <div class="subTitle">Rides</div>
          ${order.ridesTicket?.rides?.length > 0 
            ? order.ridesTicket.rides.map((r: any) => `
              <div class="rideRes">
                <div class="details">${r.name} (x${r.quantity})</div>
                <div class="totals">Php ${r.totalPrice ?? r.price * r.quantity}</div>
              </div>
            `).join('')
            : '<div class="details">No rides booked</div>'
          }

          <div class="divider"></div>

          <div class="totals" style="margin-top: 10px;">TOTAL: Php ${order.payment.totalPay.toFixed(2)}</div>
          <div class="details" style="text-align: right;">Points Earned: ${order.collectedPoints || 0}</div>

        </div>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  if (!order) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>RECEIPT | ADD-TO-RIDES </Text>

      <Text style={styles.uniqueRef}>Ref No: {order.payment.reference}</Text>
      <Text style={styles.uniqueRef}>Date: <Text></Text>{order.payment.date}</Text>

      <View style={styles.divider}/>

      <Text style={styles.subTitle}>Entrance Ticket:</Text>
      <Text style={styles.details}>{order.entranceTicket?.date}</Text>
      <Text style={[styles.details, {textTransform: "capitalize"}]}>
        {order.entranceTicket?.tickets
          ? Object.entries(order.entranceTicket.tickets)
              .filter(([_, val]) => val > 0)
              .map(([k, v]) => `${k} (${v})`)
              .join("; ")
          : ""}
      </Text>
      <Text style={styles.totals}>Php {order.entranceTicket?.totalPrice || 0}</Text>

      <Text style={styles.subTitle}>Rides:</Text>
      {order.ridesTicket?.rides?.map((r: any) => (
        <View key={r.id} style={styles.rideRes}>
            <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {r.name} (x{r.quantity})
            </Text>
            <Text style={{ fontSize: 17, marginBottom: 5 }}>
                Php {r.totalPrice ?? r.price * r.quantity}
            </Text>
        </View>
        
      ))}

    <View style={styles.divider}/>

      <Text style={[styles.subTitle, {textAlign: "right"}]}>TOTAL: Php {order.payment.totalPay.toFixed(2)}</Text>
      <Text style={[styles.details, {textAlign: "right"}]}>Points Earned: {order.collectedPoints}</Text>

      <Pressable
        onPress={generateFile}
        style={styles.downloadBtn}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>DOWNLOAD RECEIPT</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('../../Home/home') }
        style={styles.confirmBtn}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>CONFIRM</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Receipt;