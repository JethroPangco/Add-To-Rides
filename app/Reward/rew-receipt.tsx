import * as React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "./rew-receipt.styles";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import QRCode from "react-native-qrcode-svg";

const RewardReceipt = () => {
  const router = useRouter();
  const { ref: refId } = useLocalSearchParams();
  const userId = auth.currentUser?.uid;

  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const snap = await get(ref(db, `redeemedRewards/${userId}/${refId}`));
    if (snap.exists()) setData(snap.val());
  };

  const formatDate = (raw: string) => {
    const d = new Date(raw);
  
    return d.toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const shortRefNo = (ref: string) => {
    if (!ref) return "";
  
    const first = ref.slice(0, 2);
    const last = ref.slice(-4);
  
    return `${first}-${last}`;
  };
  

  if (!data) return <Text>Loading...</Text>;

  const itemsList = data.items || [];

  const qrText = `
        ADD-TO-RIDES REWARD
        ------------------
        REF: ${data.refNo}
        DATE: ${formatDate(data.redeemedAt)}

        ${itemsList.map((i: any) => `${i.name} x${i.quantity}`)}
        ------------------
        TOTAL: ${data.totalPointsUsed}
        REMAINING: ${data.remainingPoints}
    `;

    const downloadReceipt = async () => {
      const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial;
              background: #595959;
              margin: 0;
              padding: 20px;
            
              display: flex;
              justify-content: center;
              align-items: center;
            }
    
            .ticketWrapper {
              background: #fff;
              border-radius: 15px;
              max-width: 350px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              width: 100%;
              overflow: hidden;
              position: relative;
            }
    
            .ticketInner {
              padding: 20px;
            }
    
            .title {
              text-align: center;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
    
            .uniqueRef {
              font-size: 15px;
              font-weight: 500;
            }
    
            .details {
              font-size: 15px;
            }
    
            .subTitle {
              font-weight: bold;
              margin-top: 10px;
              font-size: 18px;
            }
    
            .divider {
              border-top: 1px solid #000;
              margin: 15px 0;
            }
    
            .rideRes {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 5px;
            }
    
            .totals {
              font-size: 17px;
              text-align: right;
            }
    
            .qrBox {
              text-align: center;
              margin: 15px;
            }
    
            .cutLeft, .cutRight {
              position: absolute;
              top: 50%;
              width: 35px;
              height: 35px;
              background: #595959;
              border-radius: 50%;
            }
    
            .cutLeft {
              left: -20px;
            }
    
            .cutRight {
              right: -20px;
            }
    
            .footerText {
              color: gray;
              font-size: 13px;
              text-align: center;
              margin-top: 5px;
            }
    
          </style>
        </head>
    
        <body>
    
          <div class="ticketWrapper">
            <div class="cutLeft"></div>
            <div class="cutRight"></div>
    
            <div class="ticketInner">
    
              <div class="title">REWARD RECEIPT</div>
    
              <div class="uniqueRef">Ref No: ${shortRefNo(data.refNo)}</div>
              <div class="details">Date: ${formatDate(data.redeemedAt)}</div>
    
              <div class="divider"></div>
    
              <div class="subTitle">Items Redeemed</div>
    
              ${itemsList.map(i => `
                <div class="rideRes">
                  <span class="details">${i.name} x${i.quantity}</span>
                  <span class="details">${i.total}</span>
                </div>
              `).join("")}
    
              <div class="divider"></div>
    
              <div class="totals">Total Points Used: ${data.totalPointsUsed}</div>
              <div class="totals">Remaining Points: ${data.remainingPoints}</div>
    
              <div class="details">Expiry: ${formatDate(data.expiresAt)}</div>
    
              <div class="qrBox">
              <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrText)}"
              width="150"
              height="150"
              style="margin-top: 10px;"
            />
    
                <div class="footerText">
                  Validate at the counter
                </div>
              </div>
    
            </div>
          </div>
    
        </body>
      </html>
      `;
    
      const file = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(file.uri)
    };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.ticketWrapper}>
      <View style={styles.cutLeft} />
      <View style={styles.cutRight} />

      <View style={styles.ticketInner}>

        <Text style={styles.title}>REWARD RECEIPT</Text>

        <Text style={styles.uniqueRef}>Ref No: {shortRefNo(data.refNo)}</Text>
        <Text style={styles.details}>Date: {formatDate(data.redeemedAt)}</Text>

        <View style={styles.divider} />

        <Text style={styles.subTitle}>Items Redeemed</Text>

        {itemsList.map((item: any, index: number) => (
          <View key={index} style={styles.rideRes}>
            <Text style={styles.details}>
              {item.name} x{item.quantity} 
            </Text>

            <Text style={styles.details}>
              {item.total}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.totals}>
          Total Points Used: {data.totalPointsUsed}
        </Text>

        <Text style={styles.totals}>
          Remaining Points: {data.remainingPoints}
        </Text>

        <Text style={styles.details}>
          Expiry: {formatDate(data.expiresAt)}
        </Text>

        <View style={styles.qrBox}>
          <QRCode value={qrText} size={150} />
          <Text style={[styles.details, {color: "gray", fontSize: 13}]}>
            Validate at the counter
        </Text>
        </View>

      </View>
    </View>

      <Pressable
        onPress={downloadReceipt}
        style={styles.downloadBtn}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>DOWNLOAD COPY</Text>
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

export default RewardReceipt;