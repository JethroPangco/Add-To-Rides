import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 120 
  },

  header: {
    backgroundColor: "#87cbde",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 20,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  arrowBack: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },

  allBtn: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    gap: 15, 
    paddingRight: 20,
    paddingBottom: 10
  },

  checkBtn: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginHorizontal: 15, 
    marginVertical: 8 
  },

  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },

  cartImage: {
    width: 120,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  cartCategory: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },

  categTxt: {
    color: "#fff",
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginVertical: 3,
    fontWeight: "bold",
    padding: 2
  },

  otherDet: {
    fontWeight: "500",
    paddingTop: 2,
  },

  trashImg: { 
    width: 22,
    height: 22, 
    left: 4,
  },

  cartSummary: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: "#EEEEEE",
    padding: 20 ,
    justifyContent: "space-between",
    alignItems: "flex-end",
    elevation: 20,
    flexDirection: "row"
  },

  summaryTxt: {
    color: "#000", 
    fontSize: 15,
    alignItems: "center",
    marginVertical: 2.4
  },

  calcTxt: {
    color: "#000", 
    fontWeight: "bold", 
    fontSize: 20,
    textAlign: "right"
  },

  checkoutBtn: {
    marginTop: 20,
    backgroundColor: "#87cbde",
    paddingVertical: 12,
    paddingHorizontal: 25,
    elevation: 20,
    alignItems: "center",
    height: 80
  },

  checkoutTxt: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18, 
    padding: 10 
  },

  qtyContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10 
  },

  qtyBtn: {
    backgroundColor: "#ddd", paddingHorizontal: 8,
    borderRadius: 5,
    paddingVertical: 1,
  },
  
  qtySign: {
    fontSize: 15,
    fontWeight: "bold"
  },

  qtyTxt: {
    fontSize: 15,
  },

  noRec: {
    padding: 20, 
    textAlign: "center"
  }

});