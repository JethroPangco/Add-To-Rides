import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CBDE',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    image: {
        width: 500,
        height: 500,
        resizeMode: 'contain', 
        marginBottom: 0 
    },

    title: {
        fontSize: 20, 
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#fff'
    },

    dots: {
        flexDirection: 'row',
        marginBottom: 20
    },

    dot: {
        width: 13,
        height: 13, 
        borderRadius: 10,
        marginHorizontal: 5
    },

    buttons: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        width: '100%'
    },

    nextBtn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        width: '25%',
        alignItems: 'center'
    },

    prevBtn: { 
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8, 
        width: '25%',
        alignItems: 'center'
    },

    disabledBtn: {
        opacity: 0.5
    },

    btnText: {
        color: '#000',
        fontWeight: 'bold'
    },

    skipBtn: {
        position: 'absolute',
        bottom: 30,
        right: 20
    },

    skipText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

});