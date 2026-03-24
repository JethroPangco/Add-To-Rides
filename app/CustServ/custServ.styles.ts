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

    subTitle: { 
        textAlign: "center", 
        fontSize: 18, 
        marginTop: 90,
        marginHorizontal: 40,
        fontWeight: "500"
    },

    form: {
        padding: 35,
        backgroundColor: "#87cbde",
        margin: 20,
        borderRadius: 15,
        top: 20
    },
  
    label: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 18 
    },
  
    input: {
        backgroundColor: "#FEFEFE",
        color: "#000",
        padding: 15,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 15,
        borderRadius: 10
    },
  
    submitBtn: {
        marginTop: 50,
        backgroundColor: "#28b1ff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },

    submitText: {
        color: "#fff", 
        fontWeight: "bold",
        fontSize: 17
    }
  });