import React, { useState } from "react";
import { View, Image, Text, Pressable, TextInput, Alert, Modal, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import styles from "./SignUp-mod.styles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../src/config/firebaseConfig";

const SignUp = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [showTerms, setShowTerms] = useState(false);

    const validate = () => {
        if (step === 0) return username.trim() !== "";

        if (step === 1) return email.includes("@");

        if (step === 2) return phoneNum.length === 11;

        if (step === 3) {
            return (
                password.length >= 6 &&
                password === confirmPass
            );
        }

        return true;
    };

    const nextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            router.push('../../Login/Login');
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSignup = async () => {
        if (!username || !email || !phoneNum || !password || !confirmPass) return;
        if (!email.includes("@")) return;
        if (password.length < 6) return;
        if (password !== confirmPass) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            const user = userCredential.user;

            await set(ref(db, "users/" + user.uid), {
                username,
                email,
                phone: phoneNum
            });

            Alert.alert("Success", "Account successfully created!", [
                {
                    text: "OK",
                    onPress: () => router.replace('../../Home/home'),
                },
            ]);
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    // ---------------------------
    // REAL-TIME BORDER LOGIC
    // ---------------------------

    const getUsernameBorder = () => {
        if (!username) return undefined;
        return username.trim().length > 0 ? "#2ecc71" : "#e74c3c";
    };

    const getEmailBorder = () => {
        if (!email) return undefined;
        return email.includes("@") ? "#2ecc71" : "#e74c3c";
    };

    const getPhoneBorder = () => {
        if (!phoneNum) return undefined;
        return phoneNum.length === 11 ? "#2ecc71" : "#e74c3c";
    };

    const getPasswordBorder = () => {
        if (!password) return undefined;

        if (password.length < 6) return "#e74c3c"; // weak
        if (password.length < 10) return "#f39c12"; // medium
        return "#2ecc71"; // strong
    };

    const getConfirmBorder = () => {
        if (!confirmPass) return undefined;
        return confirmPass === password ? "#2ecc71" : "#e74c3c";
    };

    return (
        <View style={styles.container}>

            <Pressable
                style={styles.arrowBack}
                onPress={() => router.push('../../Login/Login')}
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

            {/* STEP 0 */}
            {step === 0 && (
                <>
                    <Text style={styles.title}>
                        What should we <Text style={styles.textPurple}>call</Text> you?
                    </Text>

                    <TextInput
                        style={[
                            styles.inputBox,
                            getUsernameBorder() && {
                                borderColor: getUsernameBorder(),
                                borderWidth: 2
                            }
                        ]}
                        placeholder="Enter your username"
                        placeholderTextColor="#fff"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </>
            )}

            {/* STEP 1 */}
            {step === 1 && (
                <>
                    <Text style={styles.title}>
                        What is your <Text style={styles.textPurple}>email address</Text>?
                    </Text>

                    <TextInput
                        style={[
                            styles.inputBox,
                            getEmailBorder() && {
                                borderColor: getEmailBorder(),
                                borderWidth: 2
                            }
                        ]}
                        placeholder="Enter your email"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <>
                    <Text style={styles.title}>
                        How can we <Text style={styles.textPurple}>reach out</Text> to you?
                    </Text>

                    <TextInput
                        style={[
                            styles.inputBox,
                            getPhoneBorder() && {
                                borderColor: getPhoneBorder(),
                                borderWidth: 2
                            }
                        ]}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#fff"
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                        keyboardType="numeric"
                    />
                </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
                <>
                    <Text style={styles.title}>
                        Kindly input your <Text style={styles.textPurple}>password</Text>.
                    </Text>

                    <TextInput
                        style={[
                            styles.inputBox,
                            getPasswordBorder() && {
                                borderColor: getPasswordBorder(),
                                borderWidth: 2
                            }
                        ]}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={[
                            styles.inputBox,
                            getConfirmBorder() && {
                                borderColor: getConfirmBorder(),
                                borderWidth: 2
                            }
                        ]}
                        placeholder="Confirm Password"
                        placeholderTextColor="#fff"
                        value={confirmPass}
                        onChangeText={setConfirmPass}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
                <>
                    <Text style={styles.title}>
                        Do you agree with our <Text style={styles.textPurple}>terms and conditions</Text>?
                    </Text>
                    <Pressable onPress={() => setShowTerms(true)}> 
                        <Text style={{ color: '#000A78', fontWeight: 'bold'}}>Terms & Conditions</Text> 
                    </Pressable>
                </>
            )}

            {/* STEP 5 */}
            {step === 5 && (
                <>
                    <Text style={styles.createWelcome}>WELCOME!</Text>
                    <Text style={styles.createText}>
                        Get ready to be filled with adventure and surprise
                    </Text>
                </>
            )}

            {/* BUTTONS */}
            <View style={styles.buttons}>

                {step <= 3 && (
                    <>
                        <Pressable
                            onPress={() => {
                                if (step === 0) router.push('../../Login/Login');
                                else prevStep();
                            }}
                            style={styles.prevBtn}
                        >
                            <Text style={styles.btnPrevText}>
                                {step === 0 ? "Cancel" : "Back"}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                if (validate()) nextStep();
                            }}
                            style={styles.nextBtn}
                        >
                            <Text style={styles.btnText}>Proceed</Text>
                        </Pressable>
                    </>
                )}

                {step === 4 && (
                    <>
                        <Pressable onPress={prevStep} style={styles.notAgreeBtn}>
                            <Text>No, I don't agree</Text>
                        </Pressable>

                        <Pressable onPress={nextStep} style={styles.agreeBtn}>
                            <Text style={styles.btnText}>I agree, proceed</Text>
                        </Pressable>
                    </>
                )}
            </View>

            {step === 5 && (
                <Pressable onPress={handleSignup} style={styles.createBtn}>
                    <Text style={styles.createBtnText}>Start</Text>
                </Pressable>
            )}

            {/* TERMS AND CONDITION MODAL */}
            <Modal
                visible={showTerms}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowTerms(false)}
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
                                Terms & Conditions
                            </Text>

                            {/* 1 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                ACCEPTANCE OF TERMS
                            </Text>
                            <Text>
                                By accessing or using the mobile application, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use the application.
                            </Text>

                            {/* 2 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                LEGAL COMPLIANCE
                            </Text>
                            <Text>
                                This application complies with applicable Philippine laws, including the Data Privacy Act of 2012, the Electronic Commerce Act of 2000, and the Consumer Act of the Philippines.
                            </Text>

                            {/* 3 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                DESCRIPTION OF SERVICE
                            </Text>
                            <Text>
                                The application allows users to schedule, book, and manage ride tickets. Services include route selection, time scheduling, digital ticketing, and notifications.
                            </Text>

                            {/* 4 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                USER ACCOUNTS
                            </Text>
                            <Text>
                                1. You must provide accurate and complete information.{"\n"}
                                2. You are responsible for maintaining account confidentiality.{"\n"}
                                3. You are responsible for all activities under your account.{"\n"}
                                4. Misrepresentation of identity may result in account suspension under applicable laws.
                            </Text>

                            {/* 5 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                BOOKING AND PAYMENTS
                            </Text>
                            <Text>
                                1. All bookings are subject to availability.{"\n"}
                                2. Prices are clearly displayed before confirmation.{"\n"}
                                3. Payments must be completed through approved methods such as digital wallets or online banking.{"\n"}
                                4. Failure to complete payment will result in cancellation.
                            </Text>

                            {/* 6 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                CANCELLATION AND REFUND POLICY
                            </Text>
                            <Text>
                                1. Users may cancel within allowed timeframe.{"\n"}
                                2. Refunds follow Philippine consumer protection laws.{"\n"}
                                3. Processing time depends on payment provider.
                            </Text>

                            {/* 7 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                USER RESPONSIBILITIES
                            </Text>
                            <Text>
                                1. Do not misuse the application.{"\n"}
                                2. Do not provide false booking information.{"\n"}
                                3. Comply with all Philippine laws.{"\n"}
                                4. Unauthorized access or hacking is punishable under the Electronic Commerce Act.
                            </Text>

                            {/* 8 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                DATA PRIVACY
                            </Text>
                            <Text>
                                1. Data is processed under the Data Privacy Act of 2012.{"\n"}
                                2. Used only for service delivery, verification, and security.{"\n"}
                                3. We apply reasonable security measures.{"\n"}
                                4. Users may request access, correction, or deletion of data.
                            </Text>

                            {/* 9 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                SERVICE AVAILABILITY
                            </Text>
                            <Text>
                                Service may be interrupted due to maintenance, network issues, or external factors. No guarantee of uninterrupted service.
                            </Text>

                            {/* 10 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                LIMITATION OF LIABILITY
                            </Text>
                            <Text>
                                We are not liable for delays, cancellations, or issues caused by third parties or incorrect user input.
                            </Text>

                            {/* 11 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                THIRD PARTY SERVICES
                            </Text>
                            <Text>
                                We are not responsible for third party services such as payment gateways.
                            </Text>

                            {/* 12 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                TERMINATION
                            </Text>
                            <Text>
                                We may terminate accounts that violate terms. Users may stop using the app anytime.
                            </Text>

                            {/* 13 */}
                            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                GOVERNING LAW
                            </Text>
                            <Text>
                                These Terms are governed by the laws of the Philippines. Disputes fall under Philippine courts.
                            </Text>

                            <Pressable
                                onPress={() => setShowTerms(false)}
                                style={styles.closeBtn}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Close
                                </Text>
                            </Pressable>

                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SignUp;