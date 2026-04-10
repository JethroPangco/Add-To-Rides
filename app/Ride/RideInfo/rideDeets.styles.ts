import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#fff" 
    },
    
    arrowBack: {
        flexDirection: "row"
    },

    header: {
        backgroundColor: "#87cbde",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        position: "absolute",
        elevation: 20,
        zIndex: 20,
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
  
    headerTitle: { 
        textAlign: "center", 
        fontSize: 20, 
        fontWeight: "700",
        color: "#fff",
        flex: 1
    },

    image: { 
        width: "100%", 
        height: 300,
        marginTop: 100
    },

    infoContainer: { 
        padding: 30,
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: '0 0 5px 0px rgba(0, 0, 0, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    cardOverlay: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.30)",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    
    divider: { 
        height: 1, 
        backgroundColor: "#000", 
        marginBottom: 20,  
        marginTop: 20,  
        width: "100%" 
    },

    label: { 
        fontSize: 20, 
        fontWeight: "bold",
        marginBottom: 10,
        padding: 6,
        width: "90%",
        textAlign: "center",
        color: "#fff",
        borderRadius: 15
    },
    
    price: { 
        fontSize: 40, 
        fontWeight: "600", 
        color: "#fff",
        textAlign: "center" ,
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: -1, height: 5 },
        textShadowRadius: 10,
    },
    
    descrip: { 
        fontSize: 16, 
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center"
    },
    
    details: { 
        fontSize: 15, 
        marginBottom: 20,
        backgroundColor: "#DADADA",
        padding: 10,
        borderRadius: 15,
        width: "95%",
        textAlign: "center",
        fontWeight: "600" 
    },
    
    detailHeader: {
        fontWeight: "bold", 
        fontSize: 16,
        marginBottom: 10
    },
   
    button: {
        backgroundColor: "#004d94",
        paddingVertical: 15,
        alignItems: "center",
        width: "100%",
        position: "absolute",
        height: 70,
        elevation: 40,
        zIndex: 40,
        left: 0,
        bottom: 0,
        right: 0
    },

    buttonText: { 
        fontWeight: "bold", 
        color: "#fff", 
        fontSize: 16 
    },
});