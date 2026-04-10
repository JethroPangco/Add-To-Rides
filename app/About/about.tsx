import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import styles from "./about.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, get } from "firebase/database";

const AboutUs = () => {
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
          <Text style={styles.headerTitle}>ABOUT US</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.welcome}>
          <Text style={styles.txt}>WELCOME!</Text>
          <Image 
            source={require("../../assets/images/add-to-rides-white.png")}
            style={styles.logo}
          />

          <View style={styles.divider}/>

          <Text style={{fontWeight: "bold", fontSize: 15}}>What is Add-To-Rides?</Text>

          <View style={styles.descripCont}>
            <Text style={styles.descText}> {'\t\t'}
             Add-To-Rides is a mobile-based application designed to simplify and modernize the process of booking entrance tickets and amusement park rides. Our app allows users to register and access the platform to conveniently book and pay for park entrance fees online. In addition to entrance booking, our app enables users to selectively choose and reserve only the rides they intend to experience, instead of paying for a full ride package.
            </Text>

            <Text style={styles.descText}> {'\t\t'}
              Through this approach, Add-To-Rides helps visitors save money by allowing them to pay only for the rides they are interested in, creating a more flexible and user-centered amusement park experience. After completing the booking and payment process, Add-To-Rides automatically generates a unique reference number that serves as proof of booking. Users can present this code at the park entrance and at ride stations for fast and efficient verification.
            </Text>
          </View>

          <View style={styles.divider}/>

          <Text style={{fontWeight: "bold", fontSize: 15}}>Who are we?</Text>

          <View style={styles.descripCont}>
            <Text style={styles.descText}> {'\t\t'}
              We are a team of developers from 3rd Year BSIT, called "Codestellation", dedicated to creating innovative and user-friendly mobile applications and systems.

              <Text>{'\n\n'}Introducing the developers: </Text>
            </Text>

              <View style={styles.devContainer}>  
                <View style={styles.devSubCont}>
                  <Image source={require("../../assets/developers/banzuela.png")}
                    style={styles.devImg}
                  />
                  <Text>Benedict Banzuela</Text>
                </View>
                
                <View style={styles.devSubCont}>
                  <Image source={require("../../assets/developers/basagre.png")}
                    style={styles.devImg}
                  />
                  <Text>Benedict Basagre</Text>
                </View>

                <View style={styles.devSubCont}>
                  <Image source={require("../../assets/developers/kyla.jpg")}
                    style={styles.devImg}
                  />
                  <Text>Kyla Cariño</Text>
                </View>

                <View style={styles.devSubCont}>
                  <Image source={require("../../assets/developers/charles.jpg")}
                    style={styles.devImg}
                  />
                  <Text>Charles Ellana</Text>
                </View>

                <View style={styles.devSubCont}>
                  <Image source={require("../../assets/developers/jeth.jpg")}
                    style={styles.devImg}
                  />
                  <Text>Jethro Pangco</Text>
                </View>
              </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default AboutUs;