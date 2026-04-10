import * as React from "react"
import { useRouter } from "expo-router"
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";
import styles from "./home.styles";
import Sidebar from "../Navigation/Sidebar";
import BottomNav from "../Navigation/BottomNav";

const ridesData = [
  { 
    name: "Exciting", 
    image: require("../../assets/images/home-exciting.png") 
  },
  { 
    name: "Thrilling", 
    image: require("../../assets/images/home-thrilling.png") 
  },
  { 
    name: "Extreme", 
    image: require("../../assets/images/home-extreme.png") 
  }
];

const Home = () => {
    const { width } = Dimensions.get("window");
    const SIDEBAR_WIDTH = width * 0.75;
    
    const router = useRouter();
    const sidebarX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
      Animated.timing(sidebarX,{
        toValue:0,
        duration:300,
        useNativeDriver:true
      }).start();
    };
    
    const closeSidebar = () => {
      Animated.timing(sidebarX,{
        toValue:-SIDEBAR_WIDTH,
        duration:300,
        useNativeDriver:true
      }).start(()=>setSidebarOpen(false));
    };
  
    const panResponder = React.useRef(
      PanResponder.create({
  
      onMoveShouldSetPanResponder:(_,gesture)=>{
        if(!sidebarOpen && gesture.moveX < 30 && gesture.dx > 10){
          return true;
        }
        if(sidebarOpen && gesture.dx < -10){
          return true;
        }
        return false;
      },
  
      onPanResponderMove:(_,gesture)=>{
        let newX = gesture.dx - SIDEBAR_WIDTH;
  
        if(sidebarOpen) newX = gesture.dx;
  
        if(newX > 0) newX = 0;
        if(newX < -SIDEBAR_WIDTH) newX = -SIDEBAR_WIDTH;
  
        sidebarX.setValue(newX);
      },
  
      onPanResponderRelease:(_,gesture)=>{
        if(gesture.dx > 100){
          openSidebar();
        }
        else if(gesture.dx < -100){
          closeSidebar();
        }
        else{
          sidebarOpen ? openSidebar() : closeSidebar();
        }
      }
  
    })
    ).current;

    const btnLogout = () => {
      router.replace('/Login/Login');
    };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Sidebar */}
        <Animated.View
          style={[
            styles.sidebar,
            { transform: [{ translateX: sidebarX }] }
          ]}
        >
          <Sidebar btnLogout={btnLogout}/>
        </Animated.View>

        {/*Header Navbar*/}
        <View style={styles.header}>
          <View style={styles.topIcons}>
            <Pressable onPress={openSidebar}>
              <Image
                source={require("../../assets/icons/menu-bar.png")}
                style={styles.headerIcon}
              />
            </Pressable>

            <View style={styles.topRightIcons}>
              <Pressable  onPress={() => router.push('../Cart/cart')}>
                <Image
                  source={require("../../assets/icons/cart.png")}
                  style={styles.headerIcon}
                />
              </Pressable> 
              <Pressable onPress={() => alert("Notif Pressed")}>
                <Image
                  source={require("../../assets/icons/notif.png")}
                  style={styles.headerIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
        
        {sidebarOpen && (
          <Pressable
            style={styles.overlay}
            onPress={closeSidebar}
          />
        )}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/*Information container*/}
        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
              <View style={styles.infoBox}>
                <View style={styles.infoHighlight} />
                <Text style={styles.infoLabel}>LOCATION</Text>
                <Text style={styles.infoText}>Sta. Rosa, Laguna</Text>
              </View>

              <View style={[styles.infoBox, { marginTop: 10 }]}>
                <View style={[styles.infoHighlight, { backgroundColor: "#5dd4ff" }]} />
                <Text style={styles.infoLabel}>OPERATING HOURS</Text>
                <Text style={styles.infoText}>11:00 am to 8:00 pm</Text>
              </View>
            </View>
        </View>

        {/* Attractions */}
        <Text style={styles.attractionsTitle}>ATTRACTIONS</Text>
        
        <Text style={styles.attractionsSubtitle}>
          Choose your desired kind of attraction.
        </Text>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ridesScroll}
        >
          {ridesData.map((ride, index) => (
            <Pressable
              key={index}
              style={styles.rideCard}
              onPress={() => alert(`${ride.name} pressed!`)}
            >
              <ImageBackground
                source={ride.image}
                style={styles.rideImage}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.rideText}>{ride.name}</Text>
              </ImageBackground>
            </Pressable>
          ))}
        </ScrollView>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <ImageBackground
              source={require("../../assets/images/home-carousel.png")}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 10 }}
          >
          </ImageBackground>
           
          <View style={styles.infoMainText}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Various rides are available!</Text>
          
                <Text style={styles.cardSubtitle}>
                  Get your online ticket now to enjoy ride without any hassle.
                </Text>
          
                <Pressable onPress={() => router.push('../../Ride/ride')}>
                  <Text style={styles.viewRidesText}>View Rides →</Text>
                </Pressable>
              </View>
          
              {/* Character Image */}
              <Image
                source={require("../../assets/images/home-point.png")}
                style={styles.characterImage}
              />
          </View>
        </View>    
      </ScrollView>
      
        <Pressable
              style={styles.fixedBookNow}
              onPress={() => router.push('../EntranceTicket/enticket')}
          >
            <Text style={styles.bookNowText}>BOOK NOW</Text>
          </Pressable>

          <BottomNav/>
    </View>
  );
};

export default Home;