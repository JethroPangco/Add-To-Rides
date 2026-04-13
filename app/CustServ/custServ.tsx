import * as React from "react";
import { ScrollView, View, Text, Pressable, Image, TextInput, Alert } from "react-native";
import styles from "./custServ.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

import { auth, db } from "../../src/config/firebaseConfig";
import { ref, push, set } from "firebase/database";

const CustomerService = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        const user = auth.currentUser;
        if (user?.email) {
            setEmail(user.email);
        }
    }, []);


    const handleSubmit = async () => {
        const userId = auth.currentUser?.uid;

        if (!email || !subject || !message) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        const msgRef = push(ref(db, `custServ/${userId}`));

        await set (msgRef, {
            email,
            subject,
            message,
            createdAt: new Date().toISOString()
        });

        Alert.alert("Success", "Message submitted!");

        setSubject("");
        setMessage("");
    }

    return (
        <View style={styles.container}>
            
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

                <Text style={styles.headerTitle}>Customer Service</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                    <Text style={styles.subTitle}>
                    We would love to hear from you. We’re just here for any inquires, comments, concerns, and feedbacks.
                    </Text>
                </View>

                <View style={styles.form}>

                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        editable={false}
                        placeholder="e.g. email@email.com"
                    />
                    
                    <Text style={styles.label}>Subject</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="e.g. Feedback, Concern"
                        value={subject}
                        onChangeText={setSubject}
                    />

                    <Text style={styles.label}>Message</Text>
                    <TextInput 
                        style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        placeholder="Type your message here"
                        value={message}
                        onChangeText={setMessage}
                    />  

                    <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>
                             Submit
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>

            <BottomNav/>
        </View>
    );
};

export default CustomerService;