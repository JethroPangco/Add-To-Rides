import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 20,
        backgroundColor: "#595959",

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
        alignItems: "center",
        margin: 10
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
        marginTop: 50,
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
        paddingBottom: 20,
        paddingHorizontal: 20
    },

    qrBox: {
        alignItems: "center",
        margin: 15
    },

    cutLeft: {
        position: "absolute",
        left: -20,
        top: "50%",
        transform: [{ translateY: -17.5 }],
        width: 35,
        height: 35,
        backgroundColor: "#595959",
        borderRadius: 100,
    },

    cutRight: {
        position: "absolute",
        right: -20,
        top: "50%",
        transform: [{ translateY: -17.5 }],
        width: 35,
        height: 35,
        backgroundColor: "#595959",
        borderRadius: 100,
    },

    
});