import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "./carts.styles";
import Checkbox from "expo-checkbox";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, onValue, remove, get, update } from "firebase/database";

const categoryPoints: Record<string, number> = {
  exciting: 50,
  thrilling: 100,
  extreme: 150,
};

const categoryColors: Record<string, string> = {
  exciting: "#1e90ff",
  thrilling: "#28a745",
  extreme: "#dc3545",
};

const AddCart = () => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;

  const [cart, setCart] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    const cartRef = ref(db, `cart/${userId}`);

    const unsubscribe = onValue(cartRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const items = Object.values(data);
        setCart(items);
        setSelectedItems([]);
      } else {
        setCart([]);
        setSelectedItems([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedItems(cart.map(item => item.id));
  const unselectAll = () => setSelectedItems([]);

  const removeFromCart = (id: string) => {
    Alert.alert(
      "Confirm", 
      "Do you want to remove this ride?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          if (!userId) return;
          remove(ref(db, `cart/${userId}/${id}`));
        },
      },
    ]);
  };

  const removeAll = () => {
    Alert.alert(
      "Confirm", 
      "Remove all items?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          if (!userId) return;
          remove(ref(db, `cart/${userId}`));
        },
      },
    ]);
  };

  const selectedCount = selectedItems.length;

  const totalPrice = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalPoints = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce(
      (sum, item) =>
        sum + categoryPoints[item.category] * item.quantity,
      0
    );

  const handleCheckout = async () => {
    if (!userId) return;

    const selected = cart.filter(item => selectedItems.includes(item.id));

    if (selected.length === 0) {
      Alert.alert("No Selected Items", "Please select at least 1 ride.");
      return;
    }

    const bookingRef = ref(db, `bookings/${userId}`);
    const snapshot = await get(bookingRef);

    let ridesTicket = [];

    if (snapshot.exists()) {
      ridesTicket = snapshot.val().ridesTicket || [];
    }

    const newBooking = {
      date: new Date().toDateString(),
      rides: cart.filter(item => selectedItems.includes(item.id)),
      totalPrice,
      totalPoints,
      createdAt: new Date().toISOString(),
    };

    await update(bookingRef, {
      ridesTicket: [...ridesTicket, newBooking],
    });

    router.push('../BookSummary/summary')
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (!userId) return;
  
    if (quantity < 1) {
      Alert.alert(
        "Confirm", 
        "Do you want to remove this ride?", [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            if (!userId) return;
            remove(ref(db, `cart/${userId}/${id}`));
          },
        },
      ]);
      return;
    }
  
    update(ref(db, `cart/${userId}/${id}`), {
      quantity: quantity,
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.arrowBack} onPress={() => router.push("../../Ride/ride")}>
          <Image
            source={require("../../assets/images/arrowback.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.headerTitle}>MY CART</Text>
      </View>

      <View style={styles.allBtn}>
        <Pressable onPress={selectAll}>
          <Text style={{ color: "#007bff", fontWeight: "bold" }}>Select All</Text>
        </Pressable>

        <Pressable onPress={unselectAll}>
          <Text style={{ color: "#6c757d", fontWeight: "bold" }}>Unselect All</Text>
        </Pressable>

        <Pressable onPress={removeAll}>
          <Text style={{ color: "#dc3545", fontWeight: "bold" }}>Remove All</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {cart.map(item => (
          <View key={item.id} style={styles.checkBtn}>
            
            <Checkbox
              value={selectedItems.includes(item.id)}
              onValueChange={() => toggleSelect(item.id)}
              style={{ marginRight: 4 }}
            />

            <View style={styles.cartCard}>
              <Image source={item.image} style={styles.cartImage} />

              <View style={{ flex: 0.8, marginLeft: 20 }}>

                <Text style={styles.cartTitle}>{item.name}</Text>
                
                <Text style={[styles.categTxt, { backgroundColor: categoryColors[item.category]}]}>
                    {item.category.toUpperCase()}
                </Text>

                <Text style={styles.otherDet}>Php {item.price}</Text>
                
                <Text style={styles.otherDet}>Points: {categoryPoints[item.category] * item.quantity}</Text>
                  
                <View style={styles.qtyContainer}>
                  <Pressable onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtySign}>-</Text>
                  </Pressable>

                  <Text style={styles.qtyTxt}>{item.quantity}</Text>
                    
                  <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtySign}>+</Text>
                  </Pressable>
                </View>

              </View>

              
            </View><Pressable onPress={() => removeFromCart(item.id)}>
                <Image source={require('../../assets/icons/trash.png')} style={styles.trashImg}/>
              </Pressable>
          </View>
        ))}

        {cart.length === 0 && (
          <View>
            <Text style={styles.noRec}>Your cart is empty</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.cartSummary}>
        <View>
          <Text style={styles.summaryTxt}>
            Total Ride Selected:
          </Text>
          <Text style={styles.summaryTxt}>
            Total Points:
          </Text>
          <Text style={styles.summaryTxt}>
            Total Amount:
          </Text>
        </View>

        <View>
          <Text style={styles.calcTxt}>
            {selectedCount}
          </Text>
          <Text style={styles.calcTxt}>
            {totalPoints}
          </Text>
          <Text style={styles.calcTxt}>
            Php {totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
        <Text style={styles.checkoutTxt}>CHECKOUT</Text>
      </Pressable>
    </View>
  );
};

export default AddCart;