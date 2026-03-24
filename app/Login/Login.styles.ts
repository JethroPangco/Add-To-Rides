import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#87cbde",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15
    },

    arrowBack: {
        position: 'absolute',
        top: 65,     
        left: 20,     
        width: 30,
        height: 30,
        zIndex: 10,
        opacity: 0.5 
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 20
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 50
    },

    inputBox: {
        width: "90%",
        backgroundColor: "rgba(81,120,145,0.5)",
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold'
    },

    forgotBtn: {
        width: "90%",
        alignItems: "center",
        marginBottom: 25
    },

    forgot: {
        fontSize: 16
    },

    loginButton: {
        width: "90%",
        backgroundColor: "#28b1ff",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 35
    },

    loginText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700"
    },

    signupText: {
        fontSize: 16,
        marginBottom: 10
    },

    signupButton: {
        width: "90%",
        backgroundColor: "#fff",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center"
    },

    signupButtonText: {
        fontSize: 18,
        color: "#4d4d4d",
        fontWeight: "600"
    },

    errorText: {
        color: "#FF0000",
        marginBottom: 10,
        fontStyle: "italic"
    }
});