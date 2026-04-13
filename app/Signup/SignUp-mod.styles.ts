import { StyleSheet } from "react-native";
export default StyleSheet.create({

    container: {
        backgroundColor: "#87cbde",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        flexGrow: 1, 
        padding: 50, 
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
        bottom: 50
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 50,
        textAlign: "center", 
        paddingHorizontal: 30
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
        fontWeight: '400'
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 80, 
        paddingHorizontal: 15
    },

    nextBtn: {
        backgroundColor: '#28b1ff',
        padding: 10,
        borderRadius: 30,
        width: '30%',
        marginTop: 20,
        alignItems: 'center'
    },

    prevBtn: { 
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center"
    },

    btnPrevText: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15,
        textAlign: "center"
    },

    createBtn: {
        width: "90%",
        backgroundColor: "#28b1ff",
        paddingVertical: 16,
        borderRadius: 50,
        alignItems: "center",
        position: 'absolute',
        bottom: 80, 
        paddingHorizontal: 15
    },

    createWelcome: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#B30D9D",
        marginBottom: 20
    },

    createText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 50, 
        paddingHorizontal: 20
    },
    
    createBtnText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center"
    },

    textPurple: {
        color: "#B30D9D"
    },

    agreeBtn: {
        backgroundColor: '#28b1ff',
        padding: 10,
        borderRadius: 30,
        width: '42%',
        marginTop: 20,
        alignItems: 'center'
    },

    notAgreeBtn: {
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    
    errorText: {
        color: "#FF0000",
        marginBottom: 10,
        fontStyle: "italic"
    },

    modalBg: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center"
    },

    modalContainer: {
        width: "90%",
        height: "85%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20
    },

    closeBtn: {
        marginTop: 20,
        backgroundColor: "#87cbde",
        padding: 12,
        borderRadius: 10,
        alignItems: "center"
    }
});