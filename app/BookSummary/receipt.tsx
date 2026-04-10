import * as React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "./receipt.styles";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import QRCode from "react-native-qrcode-svg";

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

  const dateTime = (raw) => {
    const date = new Date(raw);

    const months = ["January","February","March","April","May","June", "July","August","September","October","November","December"];

    const yr = date.getFullYear();
    const mon = date.getMonth();
    const day = date.getDate();

    let hrs = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, "0");

    const meridiem = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;

    return `${yr}-${mon}-${day} | ${hrs}:${mins} ${meridiem}`;
  };

  const shortRefNo = (ref: string) => {
    const split = ref.split("-");
    const firstRef = split[0]?.slice(0, 2);
    const lastRef = split[1]?.slice(-4);

    return `${firstRef}-${lastRef}`;
  }


  const generateFile = async () => {
    if (!order) return;

    const html = `
          <html>
          <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background: #f2f2f2;
            }

            .ticket {
              background: #fff;
              border-radius: 15px;
              padding-top: 15px;
              position: relative;
              max-width: 400px;
              margin: auto;
            }

            .header {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .logo {
              width: 60px;
              height: 60px;
              opacity: 0.5;
              margin-right: 5px;
            }

            .title {
              font-size: 20px;
              font-weight: bold;
            }

            .cut-left, .cut-right {
              position: absolute;
              top: 40%;
              width: 35px;
              height: 35px;
              background: #595959;
              border-radius: 50%;
            }

            .cut-left {
              left: -15px;
            }

            .cut-right {
              right: -15px;
            }

            .inner {
              padding: 25px;
            }

            .qr-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }

            .qr-text {
              flex: 1;
              font-size: 15px;
            }

            .qr-text p {
              margin: 2px 0;
            }

            .divider {
              border-bottom: 1px solid #000;
              margin: 15px 0;
            }

            .subtitle {
              font-weight: bold;
              margin-top: 10px;
              font-size: 18px;
            }

            .details {
              font-size: 15px;
            }

            .totals {
              text-align: right;
              font-size: 17px;
            }

            .ride {
              display: flex;
              justify-content: space-between;
              font-size: 15px;
              margin-top: 5px;
            }

          </style>
          </head>

          <body>

            <div class="ticket">

              <div class="header">
                <img src="../../assets/images/add-to-rides-white.png"/>
                <div class="title">ADD-TO-RIDES</div>
              </div>

              <div class="cut-left"></div>
              <div class="cut-right"></div>

              <div class="inner">

                <div class="qr-row">
                  
                  <div class="qr-text">
                    <p><b>Ref No:</b> ${shortRefNo(order.payment.reference)}</p>
                    <p><b>Date:</b> ${dateTime(order.payment.date)}</p>
                  </div>

                  
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${order.payment.reference}" />

                </div>

                <div class="divider"></div>

                <div class="subtitle">Entrance Ticket:</div>
                <div class="details">${order.entranceTicket?.date}</div>

                <div class="details">
                  ${
                    order.entranceTicket?.tickets
                      ? Object.entries(order.entranceTicket.tickets)
                          .filter(([_, val]) => val > 0)
                          .map(([k, v]) => `${k} (${v})`)
                          .join("; ")
                      : ""
                  }
                </div>

                <div class="totals">
                  Php ${order.entranceTicket?.totalPrice || 0}
                </div>

                <div class="subtitle">Rides:</div>

                ${
                  order.ridesTicket?.rides?.map((r) => `
                    <div class="ride">
                      <span>${r.name} (x${r.quantity})</span>
                      <span>Php ${r.totalPrice ?? r.price * r.quantity}</span>
                    </div>
                  `).join("")
                }

                <div class="divider"></div>

                <div class="totals">
                  <b>TOTAL: Php ${order.payment.totalPay.toFixed(2)}</b>
                </div>

                <div class="totals">
                  Points Earned: ${order.collectedPoints}
                </div>

              </div>
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

      <View style={styles.ticketWrapper}>
        <View style={styles.header}>
            <Image 
                source={require("../../assets/images/add-to-rides-white.png")}
                style={styles.logo}
              />
            <Text style={styles.title}> ADD-TO-RIDES </Text>
        </View>
        
        <View style={styles.cutLeft} />
        <View style={styles.cutRight} />

        <View style={styles.ticketInner}>
          <View style={styles.qrRow}>
            
            <View style={styles.qrText}>
              <Text style={styles.uniqueRef}>
                Ref No: {shortRefNo(order.payment.reference)}
              </Text>

              <Text style={styles.uniqueRef}>
                Date: {dateTime(order.payment.date)}
              </Text>
            </View>
            
            <View style={styles.qrCode}>
              <QRCode 
                value={order.payment.reference}
                size={90}
              />
            </View>

          </View>

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

        </View>
      </View>
      
      <Pressable
        onPress={generateFile}
        style={styles.downloadBtn}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>DOWNLOAD TICKET</Text>
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