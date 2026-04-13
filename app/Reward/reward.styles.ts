import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    scrollContent: {
        paddingTop: 90,
        paddingBottom: 90,
    },

    /* HEADER */
    header: {
        backgroundColor: "#87cbde",
        paddingTop: 50,
        paddingHorizontal: 20,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
    },

    topIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    headerIcon: {
        width: 22,
        height: 22,
    },

    topRightIcons: {
        flexDirection: "row",
        gap: 15,
    },

    topLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },

    /* SIDEBAR */
    sidebar: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: width * 0.75,
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingHorizontal: 20,
        zIndex: 100,
    },

    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.35)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
    },

    /* POINTS CARD */
    pointsCard: {
        height: 300,
        alignItems: "center"
    },

    cardOverlay: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(180, 229, 243, 0.72)",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      
    },

    pointsTitle: {
        fontSize: 30,
        fontWeight: "bold",
    },

    pointsValue: {
        marginTop: 10,
        fontSize: 50,
        fontWeight: "bold"
    },

    pointsLabel: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: "bold"
    },

    pointsDesc: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold"
    },

    /* SECTION */
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    divider: { 
        height: 1, 
        backgroundColor: "#000", 
        marginVertical: 10,
        marginBottom: 5    
    },

    /* REWARD CARD */
    rewardCard: {
        flexDirection: "row",
        backgroundColor: "#00b2ba",
        borderRadius: 12,
        marginBottom: 15,
        alignItems: "center",
    },

    rewardImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        marginRight: 20
    },

    rewardInfo: {
        flex: 1,
        justifyContent: "space-between",
        marginRight: 20,
    },

    rewardName: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"
    },

    rewardPoints: {
        fontSize: 14,
        marginVertical: 5,
        textAlign: "center"
    },

    rewardBtn: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 20,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: "#02dc35",
        elevation: 2
    },

    rewardBtnText: {
        color: "#fff",
        fontWeight: "700",
    },
    
    redeemIndicator: {
        padding: 5,
        textAlign: "center",
        borderRadius: 100
    },

    redeemQty: {
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 5,
        justifyContent: "center",
        marginBottom: 10
    },
    
    qtyBtn: {
        backgroundColor: "#004497",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
        fontWeight: "bold",
        borderRadius: 50
    }, 

    addBtn: {
        marginTop: 10,
        backgroundColor: "#87cbde",
        padding: 10,
        borderRadius: 10,
    },

    addBtnText: {
        color: "#fff",
        fontWeight: "700",
    },

});