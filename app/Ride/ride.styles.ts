import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#fff"
    },
    
    scrollContent: { 
        paddingBottom: 110,
        paddingTop: 20
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
    
    headerTitle: { 
        textAlign: "left",
        fontSize: 20, 
        fontWeight: "700",
        color: "#fff"
    },
  
    /* Info Section */
    infoContainer: {
        backgroundColor: "#5badc4",
        paddingTop: 110,
        paddingBottom: 15,
        paddingHorizontal: 20,   
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    infoSection: {  
        alignItems: "center"
    },

    category: {
        flexDirection: "row", 
        alignItems: "center" 
    },

    infoBox: {  
        width: 300,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingHorizontal: 15,
        overflow: "hidden", 
        borderColor: "#000",
        borderWidth: 1,
        flex: 1, 
        marginRight: 10 
    },
    
    sidebar:{
        position:"absolute",
        left:0,
        top:0,
        bottom:0,
        width:SCREEN_WIDTH * 0.75,
        backgroundColor:"#fff",
        paddingTop:30,
        paddingHorizontal:20,
        zIndex:100,
        elevation:100
    },

    overlay:{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:"rgba(0,0,0,0.35)",
        zIndex:90
    },

    card: {
        backgroundColor: "#fff",
        boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        marginTop: 15,
        width: "48%",
        elevation: 3
    },

    cardText: {
        padding: 10
    },

    image: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
      
    title: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 8
    },
      
    subtitle: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 8
    },
      
    details: {
        textAlign: "center",
        fontSize: 13,
        marginVertical: 5
    },
      
    view: {
        textAlign: "center",
        color: "red",
        fontSize: 15,
        margin: 11,
        fontWeight: "bold"
    },

});