import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
    scroll: {
        paddingBottom: 150,
        paddingTop: 50
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


});