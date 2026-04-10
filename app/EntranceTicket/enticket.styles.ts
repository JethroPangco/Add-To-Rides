import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#fff"
    },
    
    scrollContent: { 
        paddingBottom: 170,
        marginTop: 50, 
        paddingHorizontal: 15, 
    },
  
    /* Header */
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
  
    /* Top Icons */
    topIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },

    headerIcon: { 
        width: 22, 
        height: 22 
    },
    
    topRightIcons: {
        flexDirection: "row",
        gap: 15
    },

    topLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    
    headerTitle: { 
        textAlign: "left",
        fontSize: 20, 
        fontWeight: "700",
        color: "#fff"
    },

    
    sidebar:{
        position:"absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width:SCREEN_WIDTH * 0.75,
        backgroundColor:"#fff",
        paddingTop:30,
        paddingHorizontal:20,
        zIndex: 100,
        elevation: 100
    },

    overlay:{
        position:"absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:"rgba(0,0,0,0.35)",
        zIndex: 90
    },

    subTitle: { 
        textAlign: "center", 
        fontSize: 18, 
        marginTop: 75,
        marginHorizontal: 40,
        fontStyle: "italic"
    },

    deetsContainer: {
        paddingTop: 30
    },

    deetsText: {
        fontWeight: "bold", 
        fontStyle: "normal",
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 10
    },

    divider: { 
        height: 1, 
        backgroundColor: "#000", 
        marginVertical: 10
    },

    priceCard: {
        justifyContent: "space-between", 
        marginBottom: 15,
        gap: 10
    },
    
    card: {
        padding: 20,
        borderRadius: 20,
        alignItems: "center", 
        flex: 1
    },

    cardText: {
        fontWeight: "bold",
        fontSize: 25
    },
    
    cardSubText: {
        fontSize: 15,
        fontStyle: "italic",
        paddingTop: 5,
        paddingBottom: 5
    },

    text: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20
    },

    inputCalendar: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        flexDirection: "row",
        gap: 5
    },

    inputTime: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    inputEndTime: {
        padding: 15, 
        fontSize: 16, 
        fontWeight: "bold", 
        borderWidth: 1, 
        borderRadius: 10,
        marginBottom: 20,
    },

    ticketType: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        borderRadius: 5,
        padding: 15
    },

    qtyBtn: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },

    proceed: {
        width: "60%",
        height: 50,
        backgroundColor: "#87cbde",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20,
    }
});