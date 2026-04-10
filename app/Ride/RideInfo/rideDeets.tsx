import React from "react";
import { View, Text, Image, ImageBackground, ScrollView, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import rides from "../rideList";
import styles from "./rideDeets.styles";
import { useCart } from "../../Cart/cartTemp";

const RideDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === id);
  const { addToCart } = useCart();

  if (!ride) return <Text>Ride not found</Text>;

  const categoryColors: Record<string, string> = {
    exciting: "#1e90ff",
    thrilling: "#28a745",
    extreme: "#dc3545",
  };

  const handleAddToCart = () => {
    addToCart({
      id: ride.id,
      name: ride.name,
      category: ride.category,
      price: ride.price,
      image: ride.image,
      quantity: 1,
    });
    Alert.alert("Added to cart", `${ride.name} added!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.arrowBack} onPress={() => router.push("../../Ride/ride")}>
          <Image
            source={require("../../../assets/images/arrowback.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.headerTitle}>{ride.name}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground source={ride.image} style={styles.image} resizeMode="cover">
          <View style={styles.cardOverlay}>
            <Text style={styles.price}>PHP {ride.price}.00</Text>
          </View>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={[styles.label, { backgroundColor: categoryColors[ride.category] || "#000" }]}>
            {ride.label.toUpperCase()}
          </Text>
          <Text style={styles.descrip}>{ride.descrip}</Text>
          <View style={styles.divider} />
          <Text style={styles.detailHeader}>AGE RESTRICTION:</Text>
          <Text style={styles.details}>{ride.age}</Text>
          <Text style={styles.detailHeader}>HEIGHT RESTRICTION:</Text>
          <Text style={styles.details}>{ride.height}</Text>
          <Text style={styles.detailHeader}>DURATION:</Text>
          <Text style={styles.details}>{ride.duration}</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>ADD TO CART</Text>
      </Pressable>
    </View>
  );
};

export default RideDetails;