import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#87CEDE"
    },
    
    scroll: {
        paddingBottom: 120 
    },

    header: {
      alignItems: "center",
      paddingTop: 60,
      paddingBottom: 100,
      backgroundColor: "#28b1ff"
    },
  
    arrowBack: {
        position: "absolute",
        left: 20,
        top: 65,
        width: 30,
        height: 30,
        opacity: 0.5
    },
  
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        top: 50
    },
  
    initial: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "bold"
    },
  
    hello: {
      fontSize: 28,
      color: "#fff",
      marginTop: 10,
      fontWeight: "bold",
      top: 60

    },
  
    form: {
        padding: 20
    },
  
    label: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: 20,
        fontSize: 18 
    },
  
    input: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: "#fff",
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 15
    },
  
    saveBtn: {
        marginTop: 30,
        backgroundColor: "#28b1ff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },

    saveText: {
        color: "#fff", 
        fontWeight: "bold" 
    }
  });