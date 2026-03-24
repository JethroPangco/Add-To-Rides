import React, { useState } from "react";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./Login.styles";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    type Errors = {
        email?: string;
        password?: string;
    };
    
    const [errors, setErrors] = useState<Errors>({});
    
    const validate = () => {
        let errors: Errors = {};

        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <View style={styles.container}>
       
        <Pressable 
        style={styles.arrowBack} 
        onPress={() => router.push('../../Walkthrough/Walkthrough')} 
        >
        <Image
            source={require('../../assets/images/arrowback.png')}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
        />
        </Pressable>

        <Image
            source={require('../../assets/images/add-to-rides-blue.png')}
            style={styles.logo}
            resizeMode="contain"
        />

        <Text style={styles.title}>Log In</Text>

            {
                errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null
            }
        <TextInput
            style={styles.inputBox}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />


            {
                errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null
            }   

        <TextInput
            style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
        />

        <Pressable style={styles.forgotBtn}>
            <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>

        <Pressable style={styles.loginButton}
                onPress={() => {
                    if (validate()){
                        router.push('../../Home/home')
                    }
                }}>
            <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        <Text style={styles.signupText}>Don't have an account?</Text>

        <Pressable style={styles.signupButton}
                onPress={() => router.push('../../Signup/SignUp-mod')}>
            <Text style={styles.signupButtonText}>Create an account</Text>
        </Pressable>

        </View>
    );
}