import React, { useState } from "react";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import styles from "./SignUp-mod.styles" ;

const SignUp = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    
    type Errors = {
        username?: string;
        email?: string;
        phoneNum?: string;
        password?: string;
        confirmPass?: string;
    };
    
    const [errors, setErrors] = useState<Errors>({});
    
    const validate = () => {
        let errors: Errors = {};

        if (step === 0) {
            if (!username) {
                errors.username = "Username is required";
            }
        }
        
        if (step === 1 ){
            if (!email) {
                errors.email = "Email is required";
            } else if (!email.includes("@")) {
                errors.email = "Invalid email address, must contain @";
            }
        }

        if (step === 2){ 
            if (!phoneNum) {
                errors.phoneNum = "Phone Number is required";
            } else if (phoneNum.length !== 11) {
                errors.phoneNum = "Phone number must be 11 digits";
            }
        }

        if (step === 3){
            if (!password) {
                errors.password = "Password is required";
            } else if (password.length < 6) {
                errors.password = "Password must contain 6 characters";
            }

            if (!confirmPass) {
                errors.confirmPass = "Confirm your password";
            } else if (password !== confirmPass) {
                errors.confirmPass = "Passwords do not match";
            }
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

        const nextStep = () => {
            if (step < 5) {
                setErrors ({});
                setStep(step + 1);
            }
            else {
                router.push('../../Home/home');
            }
        };
    
        const prevStep = () => {
            if (step > 0) 
                setStep(step - 1);
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
            
        
        {step === 0 && (
            <>
                <Text style={styles.title}>What should we <Text style={styles.textPurple}>call</Text> you?</Text>

                {
                    errors.username ? (<Text style={styles.errorText}>{errors.username}</Text>) : null
                }   
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your username"
                    placeholderTextColor="#fff"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            </>
        )}
        
        {step === 1 && (
            <>

                
                <Text style={styles.title}>What is your <Text style={styles.textPurple}>email address</Text>?</Text>

                {
                    errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null
                }   
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your email"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </>
                
        )}
        
        {step === 2 && (
            <>
  

                <Text style={styles.title}>How can we <Text style={styles.textPurple}>reach out</Text> to you?</Text>

                {
                    errors.phoneNum ? (<Text style={styles.errorText}>{errors.phoneNum}</Text>) : null
                } 
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#fff"
                    value={phoneNum}
                    onChangeText={setPhoneNum}
                    autoCapitalize="none"
                    keyboardType="numeric"
                />
            </>
                
        )}
        
        {step === 3 && (
            <>   

                <Text style={styles.title}>Kindly input your <Text style={styles.textPurple}>password</Text>.</Text>

                {
                    errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null
                }

                <TextInput
                    style={styles.inputBox}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />


                {
                    errors.confirmPass ? (<Text style={styles.errorText}>{errors.confirmPass}</Text>) : null
                }   

                <TextInput
                    style={styles.inputBox}
                    placeholder="Confirm Password"
                    placeholderTextColor="#fff"
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </>
        )}
        
        {step === 4 && (
            <>
                <Text style={styles.title}>Do you agree with our <Text style={styles.textPurple}>terms and conditions</Text>?</Text>
                <Pressable>
                    <Text style={{ color: '#000A78', fontWeight: 'bold'}}>Terms & Conditions</Text> 
                </Pressable>
            </> 
        )}

        {step === 5 && (
            <>
                <Text style={styles.createWelcome}>WELCOME!</Text>
                <Text style={styles.createText}>Get ready to be filled with adventure and surprise</Text>
            </> 
        )}


        <View style={styles.buttons}>
            {step <= 3 && (
                <>
                <Pressable onPress={() => {
                    if (step === 0) {
                        router.push('../../Login/Login');
                    } 
                    else {
                        prevStep();
                    }
                }} 
                style={styles.prevBtn}>
                    <Text style={styles.btnPrevText}>
                        { step === 0 ? "Cancel" : "Back"} 
                    </Text>
                </Pressable>

                <Pressable onPress={() => {
                    if (validate()){
                        nextStep();
                    }}} 
                    style={styles.nextBtn}>
                    <Text style={styles.btnText}>Proceed</Text>
                </Pressable>
                </> 
            )}

            {step === 4 && (
                <>
                <Pressable onPress={prevStep} style={styles.notAgreeBtn}>
                    <Text style={styles.btnPrevText}>No, I don't agree</Text>
                </Pressable>

                <Pressable onPress={nextStep} style={styles.agreeBtn}>
                    <Text style={styles.btnText}>I agree, proceed</Text>
                </Pressable>
                </> 
            )}
        </View>
      
        {step === 5 && (
            <>
                <Pressable onPress={() => router.push('../../Home/home')} style={styles.createBtn}>
                    <Text style={styles.createBtnText}>Start</Text>
                </Pressable>
            </> 
        )}

    </View>
    );
};

export default SignUp;