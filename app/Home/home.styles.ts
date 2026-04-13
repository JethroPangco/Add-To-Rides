import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#fff"
    },
    
    scrollContent: { 
        paddingBottom: 150,
        paddingTop: 50
      
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
  
    /* Info Section */
    
    infoContainer: {
        backgroundColor: "#87cbde",
        paddingTop: 80,
        paddingBottom: 35,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
    },

    infoSection: { 
        alignItems: "center"
    },

    infoBox: {
      width: SCREEN_WIDTH * 0.8,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#fff",
      justifyContent: "center",
      paddingHorizontal: 15,
      overflow: "hidden",
      boxShadow: 'inset 0px 5px 5px rgba(0, 0, 0, 0.25)'
    },

    infoHighlight: {
      position: "absolute",
      left: 0,
      width: "50%",
      height: "100%",
      backgroundColor: "#5dd4ff",
      borderRadius: 20
    },

    infoLabel: { 
        fontSize: 15, 
        fontWeight: "700", 
        color: "#000"
    },

    infoText: { 
        fontSize: 17, 
        fontWeight: "700", 
        color: "#000", 
        position: "absolute", 
        right: 15
    },
  
    /* Attractions */
    attractionsTitle: { 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700",
        marginTop: 20 
    },

    attractionsSubtitle: { 
        textAlign: "center", 
        fontSize: 18, 
        marginVertical: 5
    },
    
    ridesScroll: { 
        paddingHorizontal: 20, 
        paddingVertical: 10 
    },
   
    rideCard: { 
        width: SCREEN_WIDTH * 0.6, 
        height: SCREEN_WIDTH * 0.45, 
        marginRight: 15  
    },
    
    rideImage: { 
        flex: 1, 
        justifyContent: "center"
    },
    
    rideText: { 
        color: "#fff", 
        fontSize: 20, 
        fontWeight: "700", 
        textAlign: "center"
    },
  
    /* Divider */
    divider: { 
        height: 1, 
        backgroundColor: "#ccc", 
        marginVertical: 20, 
        marginHorizontal: 20 
    },
  
    /* Info Card */
    infoCard: { 
        marginHorizontal: SCREEN_WIDTH * 0.05, 
        marginBottom: 20 
    },
    
    cardImage: { 
        justifyContent: "center", 
        alignSelf: "center",
        padding: 10 ,
        width: SCREEN_WIDTH * 0.9,
        height: 257, 
        borderRadius: 20
    },
    
    infoMainText: {
        backgroundColor: "#8ec3d4",
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 10,
        marginTop: 20
    },
    
    textContainer: {
        flex: 1
    },

    cardTitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#000", 
        marginBottom: 5 
    },
    
    cardSubtitle: { 
        fontSize: 15, 
        fontWeight: "500",
        color: "#000", 
        marginTop: 5 
    },
    
    viewRidesBtn: { 
        marginTop: 10, 
        alignSelf: "flex-start" 
    },
    
    viewRidesText: { 
        fontSize: 15,
        marginTop: 10, 
        fontStyle: "italic", 
        color: "#01367b", 
        fontWeight: "500",
    },

    characterImage: {
        width: 120,
        height: 120,
        resizeMode: "contain"
    },
  
    /* Book Now fixed */
    fixedBookNow: {
      position: "absolute",
      bottom: 90,
      left: SCREEN_WIDTH * 0,
      right: SCREEN_WIDTH * 0,
      height: 60,
      backgroundColor: "#f86560",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 15,
      elevation: 20
    },

    bookNowText: { 
        fontSize: 16, 
        fontWeight: "800", 
        color: "#fff" 
    },
  
    /* Bottom Navigation */
    bottomNav: {
      height: 90,
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: "#ccc",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#fff",
      width: "100%",
      position: "absolute",
      elevation: 40,
      zIndex: 40,
      left: 0,
      bottom: 0,
      right: 0
    },
    
    navItem: { 
        marginBottom: 15,
        justifyContent: "center", 
        alignItems: "center" 
    },
    
    navIcon: { 
        width: 30, 
        height: 30, 
        marginBottom: 2 
    },
   
    navText: { 
        fontSize: 12, 
        color: "#000" 
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
  
    sidebarLogo:{
        width:150,
        height:150,
        resizeMode:"contain",
        alignSelf:"center",
        marginBottom:20,
        opacity: 0.5
    },

    sidebarUser:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15
    },

    sidebarAvatar:{
        width:65,
        height:65,
        marginRight:10
    },

    sidebarUsername:{
        fontSize:20,
        fontWeight:"600"
    },

    sidebarDivider:{
        height:1,
        backgroundColor:"#ccc",
        marginVertical:15
    },

    sidebarMenu:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15
    },
      
    sidebarIcon:{
        width:25,
        height:25,
        marginRight:12
    },

    sidebarMenuText:{
        fontSize:20,
        fontWeight: "500"
    },

    sidebarSection:{
        fontSize:20,
        color:"#666",
        marginTop:5,
        marginBottom:8
    },

    sidebarSub:{
        fontSize:18,
        marginBottom:6,
        marginLeft:10,
        fontWeight: "500"
    },

    sidebarMenuLogout: {
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15,
        marginTop: 30
    }
});