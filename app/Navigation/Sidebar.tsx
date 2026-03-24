import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from "../Home/home.styles";
import { useRouter } from "expo-router";

const Sidebar = ({ btnLogout }) => {
  const router = useRouter();
    
    return (
        <View style={styles.sidebar}>
          
         <Image
         source={require("../../assets/images/add-to-rides-white.png")}
         style={styles.sidebarLogo}
       />

       <View style={styles.sidebarUser}>
         <Image
           source={require("../../assets/icons/user-profile.png")}
           style={styles.sidebarAvatar}
         />
         <Text style={styles.sidebarUsername}>User Name</Text>
       </View>

       <View style={styles.sidebarDivider} />

       <Pressable style={styles.sidebarMenu}  onPress={() => router.push('../../Home/home')}>
         <Image source={require("../../assets/icons/home-icon.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>Home</Text>
       </Pressable>

       <Pressable style={styles.sidebarMenu}  onPress={() => alert("Entrance Ticket Pressed")}>
         <Image source={require("../../assets/icons/ent-ticket.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>Entrance Ticket</Text>
       </Pressable>

       <Pressable style={styles.sidebarMenu} onPress={() => router.push('../../Ride/ride')}>
         <Image source={require("../../assets/icons/ride-reserv.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>Ride Reservation</Text>
       </Pressable>

       <Pressable style={styles.sidebarMenu} onPress={() => alert("Reward System Pressed")}>
         <Image source={require("../../assets/icons/reward.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>Reward System</Text>
       </Pressable>

       <Pressable style={styles.sidebarMenu} onPress={() => router.push('../../UserProfile/user')} >
         <Image source={require("../../assets/icons/user-setting.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>User Profile</Text>
       </Pressable>

       <View style={styles.sidebarDivider} />

       <Text style={styles.sidebarSection}>Other options</Text>

       <Text style={styles.sidebarSub}>My Bookings</Text>
       <Text style={styles.sidebarSub}>My Schedule</Text>
       <Text style={styles.sidebarSub}>Vouchers</Text>
       <Text style={styles.sidebarSub}>Lost & Found</Text>

       <Pressable style={styles.sidebarMenu} onPress={() => router.push('../CustServ/custServ')} >
          <Text style={{marginTop: 20, fontWeight: "500", fontSize: 16}}>Customer Service</Text>
       </Pressable>

       <Pressable style={styles.sidebarMenu}>
          <Text style={{fontWeight: "500", fontSize: 16}}>About Us </Text>
       </Pressable>
       
       {/* Logout */}
       <Pressable style={styles.sidebarMenuLogout} onPress={btnLogout}>
         <Image source={require("../../assets/icons/logout.png")} style={styles.sidebarIcon}/>
         <Text style={styles.sidebarMenuText}>Logout</Text>
       </Pressable>
        </View>

    );
};

export default Sidebar;