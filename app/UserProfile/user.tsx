import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, View, Text, Image, Pressable, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "../UserProfile/user.style";
import BottomNav from "../Navigation/BottomNav";

import DateTimePicker from "@react-native-community/datetimepicker";
import { ref, get, update } from "firebase/database";
import { auth, db } from "../../src/config/firebaseConfig";

const UserProfile = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [bDate, setBDate] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const [firebaseUsername, setFirebaseUsername] = useState("");

    const [allowEdit, setAllowEdit] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            if (!auth.currentUser) return;

            try {
                const userRef = ref(db, `users/${auth.currentUser.uid}`);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();

                    setUsername(data.username || "");
                    setFName(data.fName || "");
                    setLName(data.lName || "");
                    setEmail(data.email || auth.currentUser.email || "");
                    setPhoneNum(data.phone || "");
                    setBDate(data.bDate || "");
                    setImage(data.profileImg || null);

                    setFirebaseUsername(data.fName || "user");
                }
            } catch (error: any) {
                console.log("FIREBASE ERROR:", error.code, error.message);
            }
        };

        loadProfile();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
        }
    };

    const saveProfile = async () => {
        if (!auth.currentUser) return;

        try {
            const userRef = ref(db, `users/${auth.currentUser.uid}`);
            await update(userRef, {
                username,
                fName,
                lName,
                email,
                phone: phoneNum,
                bDate,
                profileImg: image || null,
            });

            setFirebaseUsername(username);

            Alert.alert("Success", "Profile saved successfully!");
        } catch (error: any) {
            console.log("FIREBASE ERROR:", error.code, error.message);
            Alert.alert("Error", error.message);
        }
    };

    const getIniName = () => (firebaseUsername ? firebaseUsername.charAt(0).toUpperCase() : "?");

    // Date picker
    const [date, setDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

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

                    <Pressable onPress={allowEdit ? pickImage : null}>
                        { image ? (
                            <Image source={{ uri: image }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatar}>
                                <Text style={styles.initial}>{getIniName()}</Text>
                            </View>
                        )}

                        {allowEdit && image && (
                            <Pressable
                                onPress={() => setImage(null)}
                                style={{ marginTop: 10 }}
                            >
                                <Text style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
                                    Remove
                                </Text>
                            </Pressable>
                        )}
                    </Pressable>

                    <Text style={styles.hello}>Hello, {firebaseUsername || "user"}!</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                        value={username}
                        onChangeText={setUsername}
                        editable={allowEdit}
                        placeholder="Enter username"
                    />

                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                        value={fName}
                        onChangeText={setFName}
                        editable={allowEdit}
                        placeholder="Enter first name"
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                        value={lName}
                        onChangeText={setLName}
                        editable={allowEdit}
                        placeholder="Enter last name"
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                        value={email}
                        editable={false}
                        placeholder="Enter email address"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                        value={phoneNum}
                        onChangeText={(text) => setPhoneNum(text.replace(/[^0-9]/g, "").slice(0, 11))}
                        keyboardType="numeric"
                        placeholder="Enter phone number"
                        editable={allowEdit}
                    />

                    <Text style={styles.label}>Birth Date</Text>
                    <Pressable onPress={allowEdit ? () => setShowDatePicker(true) : null}>
                        <TextInput
                            style={[styles.input, {color: allowEdit ? "#000" : "#909090"}]}
                            value={bDate}
                            onChangeText={setBDate}
                            placeholder="Birth Date"
                            editable={false}
                        />
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="calendar"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);

                                if (selectedDate) {
                                    setDate(selectedDate);
                                    
                                    const format = 
                                        (selectedDate.getMonth() + 1).toString().padStart(2, '0') +
                                        '/' +
                                        selectedDate.getDate().toString().padStart(2, '0') +
                                        '/' +
                                        selectedDate.getFullYear();
                                    
                                    setBDate(format);
                                }
                            }}
                        />
                    )}    

                    <Pressable style={[styles.saveBtn, {backgroundColor: allowEdit ? "#28b1ff" : "#a10000"}]} 
                        onPress={() => {
                            if (allowEdit) {
                                saveProfile();
                            }  
                            setAllowEdit(!allowEdit);
                        }}>
                        <Text style={styles.saveText}>{allowEdit ? "Save Profile" : "Edit"}</Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Bottom Navbar */}
            <BottomNav />
        </View>
    );
};

export default UserProfile;