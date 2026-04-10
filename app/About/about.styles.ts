import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        paddingBottom: 100,
        paddingTop: 100
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


    welcome: {
        alignItems: "center",
        padding: 30,
        backgroundColor: "#fff",
        boxShadow: "0 0 6px rgba(0,0,0,0.3)",
        margin: 30,
        borderTopStartRadius: 100,
        borderTopEndRadius: 100
    },

    txt: {
        fontSize: 25,
        fontWeight: "bold"
    },

    logo: {
        height: 200,
        width: 200,
        borderRadius: 50
    },

    divider: {
        borderWidth: 0.4,
        backgroundColor: "#000",
        width: "100%",
        alignSelf: "center",
        margin: 20 
    },

    descripCont: {
        margin: 10,
    },

    descText: {
        textAlign: "justify",
        lineHeight: 30
    },

    devContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 20
    },

    devImg: {
        height: 110,
        width: 110,
        margin: 25,
        borderRadius: 100
    },

    devSubCont: {
        alignItems: "center"
    },
});