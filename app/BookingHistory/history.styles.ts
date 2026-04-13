import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        paddingBottom: 90,
        paddingTop: 30,
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

    backgroundContainer: {
        marginBottom: 20,
        marginHorizontal: 20, 
        backgroundColor: "#fff",
        elevation: 3,
        padding: 15,
        borderRadius: 10
    },

    subTitle: { 
        textAlign: "left", 
        fontSize: 18, 
        marginTop: 90,
        marginHorizontal: 40,
        fontWeight: "500"
    },
    
    divider: {
        borderWidth: 0.4,
        backgroundColor: "#000",
        width: "80%",
        alignSelf: "center",
        margin: 15 
    },

    txtHeader: {
        marginLeft: 20, 
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 15 
    },

    imgBg: {
        height: 120,
        marginHorizontal: 15,
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },

    overflow: {
        flex: 1,
        opacity: 0.6,
    },

    imgTxt: {
        position: "absolute", 
        padding: 10,
        alignItems: "center",       
        justifyContent: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    imgTxt2: {
        color: "#fff", 
        textAlign: "center", 
        fontWeight: "bold",
        fontSize: 15 ,
        marginBottom: 5
    },

    totalTxt: {
        marginLeft: 20,
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 17 
    },

    entContainer: {
        backgroundColor: "#f1f1f1",
        marginHorizontal: 15,
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
    },
    
    entType: {
        fontWeight: "bold", 
        fontSize: 16,
        textTransform: "capitalize" 
    },

    ptsContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
        marginHorizontal: 20
    }, 

    ptsTxt: {
        paddingVertical: 5,
        marginHorizontal: 20, 
        fontSize: 16, 
        color: "#28a745",
        fontWeight: "bold"
    },

    noRec: {
        padding: 20, 
        alignItems: "center"
    },

    touchTabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 100,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        padding: 20
    },

    viewReceiptBtn: {
        marginTop: 10,
        backgroundColor: "#007800",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 15
    }
});