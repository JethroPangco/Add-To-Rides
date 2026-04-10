import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        padding: 40,
    },

    divider: {
        borderWidth: 0.4,
        backgroundColor: "#000",
        width: "100%",
        alignSelf: "center",
        margin: 15 
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },

    logo: {
        height: 70,
        width: 70,
        opacity: 0.5
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
    
    qrRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginBottom: 15
    },
    
    qrText: {
        flex: 1          
    },

    qrCode: {
        alignItems: "center"
    },
    
    uniqueRef: {
        textAlign: "left",
        fontSize: 15,
        fontWeight: "500"
    },

    details: {
        fontSize: 15,
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

    ticketWrapper: {
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 15,
        overflow: "hidden",
        position: "relative",

        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        paddingTop: 15
    },

    ticketInner: {
        padding: 25
    },

    qrBox: {
        alignItems: "center",
        marginBottom: 10
    },

    cutLeft: {
        position: "absolute",
        left: -15,
        top: "40%",
        width: 35,
        height: 35,
        backgroundColor: "#595959",
        borderRadius: 100
    },

    cutRight: {
        position: "absolute",
        right: -15,
        top: "40%",
        width: 35,
        height: 35,
        backgroundColor: "#595959",
        borderRadius: 100
    }
  });