import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        padding: 40,
        marginTop: "50%"
    },

    divider: {
        borderWidth: 0.4,
        backgroundColor: "#000",
        width: "100%",
        alignSelf: "center",
        margin: 15 
    },
    
    title: { 
        fontSize: 20, 
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },

    subTitle: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 18 
    },

    uniqueRef: {
        textAlign: "right",
        fontSize: 15,
        fontWeight: "500"
    },

    details: {
        fontSize: 17,
    },

    totals: {
        fontSize: 17,
        textAlign:"right",
    },

    rideRes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },

    downloadBtn: { 
        marginTop: 20, 
        backgroundColor: "#87cbde", 
        padding: 10, 
        borderRadius: 5 
    },
    confirmBtn: { 
        marginTop: 20, 
        backgroundColor: "#7a0000", 
        padding: 10, 
        borderRadius: 5 
    },
  });