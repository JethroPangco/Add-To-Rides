import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        paddingTop: 40
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

    subTitle: { 
        textAlign: "center", 
        fontSize: 20, 
        marginTop: 90,
        marginHorizontal: 40,
        fontWeight: "bold"
    },
    
    divider: {
        borderWidth: 0.4,
        backgroundColor: "#000",
        width: "90%",
        alignSelf: "center",
        margin: 15 
    },

    cards: {
        backgroundColor: "#ddd",
        marginHorizontal: 10,
        paddingHorizontal: 25,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },

    methodCard: {
        marginHorizontal: 10,
        paddingHorizontal: 25,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    
    pOrderBtn: {
        backgroundColor: "#CE9E00",
        paddingVertical: 12,
        paddingHorizontal: 25,
        elevation: 20,
        alignItems: "center",
        height: 80
    }, 

    pOrderTxt: { 
      color: "#fff", 
      fontWeight: "bold", 
      fontSize: 18, 
      padding: 10 
    },
  
    rideRes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },

    totalView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5 
    },

    texts: {
        fontSize: 20, 
        fontWeight: "bold" 
    }
  });