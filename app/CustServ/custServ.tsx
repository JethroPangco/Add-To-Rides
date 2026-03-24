import * as React from "react";
import { ScrollView, View, Text, Pressable, Image, TextInput } from "react-native";
import styles from "./custServ.styles";
import { useRouter } from "expo-router";
import BottomNav from "../Navigation/BottomNav";

const CustomerService = () => {
    const router = useRouter();

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
                        placeholder="e.g. email@email.com"
                    />
                    
                    <Text style={styles.label}>Subject</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="e.g. Feedback, Concern"
                    />

                    <Text style={styles.label}>Message</Text>
                    <TextInput 
                        style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        placeholder="Type your message here"
                    />  

                    <Pressable style={styles.submitBtn}>
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