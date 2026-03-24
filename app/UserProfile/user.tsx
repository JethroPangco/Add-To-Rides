import React, { useState, useEffect } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, View, Text, Image, Pressable, TextInput } from "react-native";
import styles from "../UserProfile/user.style";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

const UserProfile = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [bDate, setBDate] = useState("");
    const [image, setImage] = useState(null);
  
    useEffect(() => {
        const loadInfo = async () => {
            const info = await AsyncStorage.getItem("profileInfo");
            const img = await AsyncStorage.getItem("profileImg");

            if (info) {
                const parsed = JSON.parse(info);
                setUsername(parsed.username);
                setFName(parsed.fName);
                setLName(parsed.lName);
                setEmail(parsed.email);
                setPhoneNum(parsed.phoneNum);
                setBDate(parsed.bDate);
            }
            
            if (img) 
                setImage(image);
        };

        loadInfo();
    }, []);

    const saveInfo = async() => {
        const info = {
            username, fName, lName, email, phoneNum, bDate
        };

        await AsyncStorage.setItem("profileInfo", JSON.stringify(info));
        alert("Profile Saved!");
    };

    const pickImg = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if(!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            await AsyncStorage.setItem("profileImg", uri);
        }
    };

    const getIniName = () => {
        return username ? username.charAt(0).toUpperCase(): "?";
    };
    

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Pressable 
                        style={styles.arrowBack} 
                        onPress={() => router.push('../../Home/home')} 
                    >
                    <Image
                        source={require('../../assets/images/arrowback.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                    </Pressable>

                    <Pressable onPress={pickImg}>
                        { image ? (
                                <Image 
                                    source={{ uri: image }} 
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={styles.avatar}>
                                    <Text style={styles.initial}>{getIniName()}</Text>
                                </View>
                            )
                        }
                    </Pressable>

                    <Text style={styles.hello}>
                        Hello, { username || "user" }!
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput 
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                    />

                    <Text style={styles.label}>First Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={fName}
                        onChangeText={setFName}
                        placeholder="Enter first name"
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={lName}
                        onChangeText={setLName}
                        placeholder="Enter last name"
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email address"
                    />
                    
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput 
                        style={styles.input}
                        value={phoneNum}
                        onChangeText={(text) => setPhoneNum(text.replace(/[^0-9]/g,"").slice(0, 11))}
                        keyboardType="numeric"
                        placeholder="Enter phone number"
                    />

                    <Text style={styles.label}>Birth Date</Text>
                    <TextInput 
                        style={styles.input}
                        value={bDate}
                        onChangeText={setBDate}
                        placeholder="MM/DD/YY"
                        keyboardType="numeric"
                    />  

                    <Pressable style={styles.saveBtn} onPress={saveInfo}>
                        <Text style={styles.saveText}>
                            Save Profile
                        </Text>
                    </Pressable>

                </View>

            </ScrollView>
            
            {/* Bottom Navbar */}
            <BottomNav/> 

        </View>
    );
};

export default UserProfile;