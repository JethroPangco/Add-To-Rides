import React, {useEffect} from "react"
import { View, Image } from "react-native"
import { useRouter } from "expo-router"
import styles from "./SplashScreen.styles"

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const interval = setTimeout(() => {
      router.replace('../Walkthrough/Walkthrough');
    }, 2000); 

    return () => clearTimeout(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/add-to-rides-blue.png')} 
        style={styles.logo}/>
    </View>
  );
};

export default SplashScreen;