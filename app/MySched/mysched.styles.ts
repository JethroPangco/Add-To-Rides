import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        paddingBottom: 100
    },

    arrowBack: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },

    header: {
        backgroundColor: "#87cbde",
        paddingTop: 50,
        paddingHorizontal: 20,
        position: "absolute",
        elevation: 20,
        zIndex: 20,
        top: 0,
        left: 0,
        right: 0
    },
  
    headerTitle: { 
        textAlign: "center", 
        fontSize: 20, 
        fontWeight: "700",
        color: "#fff"
    },

    divider: {
        borderWidth: 0.2,
        backgroundColor: "#000",
        width: "100%",
        alignSelf: "center",
        marginHorizontal: 15,
        marginTop: 10 
    },

    card: {
        backgroundColor: "#fff",
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 10,
        elevation: 3
    },
      
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 100,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        padding: 20
    },
      
    tab: {
        color: "#555"
    },
      
    active: {
        fontWeight: "bold",
        color: "#000"
    },
      
    section: {
        marginTop: 10,
        fontWeight: "bold"
    },
      
    rideRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 7,
    },
      
    rideImg: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 10,
    },
      
    receiptBtn: {
        marginTop: 10,
        backgroundColor: "#007800",
        padding: 10,
        borderRadius: 5,
        alignItems: "center"
    },
      
    status: {
        fontWeight: "bold",
        marginVertical: 5
    },
      
    cancelBtn: {
        marginTop: 10,
        backgroundColor: "#a10000",
        padding: 10,
        borderRadius: 5,
        alignItems: "center"
    }
});