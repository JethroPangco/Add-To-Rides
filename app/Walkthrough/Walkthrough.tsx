import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import styles from "./Walkthrough.styles"

const guideInfo = [
    {
        id: 1,
        image: require('../../assets/images/firstpage.png'),
        title: 'Login and Signup to start you thrilling adventure',
    },
    {
        id: 2,
        image: require('../../assets/images/secondpage.png'),
        title: 'Book entrance in advance and avoid ticket lines',
    },
    {
        id: 3,
        image: require('../../assets/images/thirdpage.png'),
        title: 'Book rides any time those that you only want',
    },
    {
        id: 4,
        image: require('../../assets/images/fourthpage.png'),
        title: 'Earn rewards and get freebies',
    },
];

function Walkthrough() {
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const btnNext = () => {
        if (index < guideInfo.length - 1) {
            setIndex(index + 1);
        }
        else {
            router.replace('../../Login/Login');
        }
    };

    const btnPrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const btnSkip = () => {
        router.replace('../../Login/Login');
    };


    return (
        <View style={styles.container}>
            <Image source={guideInfo[index].image} style={styles.image} />
            <Text style={styles.title}>{guideInfo[index].title}</Text>
            
            <View style={styles.dots}>
                {guideInfo.map((_, i) => {
                    let dotColor = '#ccc'; 
                    if (i === index) {
                        dotColor = '#fff';
                    }

                    return <View key={i} style={[styles.dot, {backgroundColor: dotColor}]}/>;
                })}
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity 
                    onPress={btnPrev} 
                    style={[styles.prevBtn, index === 0 && styles.disabledBtn]}
                    disabled = {index === 0}
                >
                    <Text style={styles.btnText}>Prev</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={btnNext} style={styles.nextBtn}>
                    <Text style = {styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={btnSkip} style={styles.skipBtn}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Walkthrough;