import react, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import  { removeFromCart,selectCartTotal, increaseQuantity,decreaseQuantity, clearCart, fetchCartFulfilled } from "../features/cart/cartSlice";
import { useGetCartQuery,useSetCartMutation } from "../service/CartService";
import ModalCheck from "../components/ModalCheck";


const CarritoScreen = () => {
  const userId = useSelector((state) => state.authReducer.value.localId);
  const items = useSelector((state) => state.cart.items || []);
  console.log("carrito completo", items);
  const total= useSelector(selectCartTotal)
  const dispatch = useDispatch()

  const {data:remoteCart, isSuccess, isLoading} = useGetCartQuery(userId);
  const [setCart] = useSetCartMutation();

  const [modalVisible, setModalVisible] = useState(false)

  //carga inicial del carrito desde la base de datos
  useEffect(() => {
  if (isSuccess && remoteCart) {
    dispatch(fetchCartFulfilled(remoteCart)); // podés hacer un action simple
  }
}, [isSuccess, remoteCart]);


//actualiza la base de datos remota cuando cambian los items
  useEffect(() => {
  if (userId) {
    setCart({userId, items });
  }
}, [items, userId]);

 if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.textVacio}>El carrito esta vacio</Text>
      ): (
        
        <View>
        <FlatList
          data={items}
          style={{backgroundColor:"#ccd5ae"}}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerCart}>
              <View style={styles.containerSecond}>
                <Text style={styles.textProduct}>{item.nombre}</Text>
                <Pressable onPress={()=> dispatch(removeFromCart( {id: item.id}))} >
                  <Text style={styles.icon}>🗑️ </Text>
                </Pressable>
              </View>           
              <View style={styles.countSection}>
                <Pressable style={styles.countButton} onPress={()=>dispatch(decreaseQuantity({ id: item.id}))}>
                  <Text style={styles.countText}>-</Text>
                </Pressable>
                 <Text style={styles.quantity}>{item.cantidad}</Text>
                <Pressable style={styles.countButton} onPress={()=>dispatch(increaseQuantity({ id: item.id}))}>
                  <Text style={styles.countText}>+</Text>
                </Pressable>
              </View>
              <Text style={styles.price}> ${((item.precio * item.cantidad).toFixed(2))}</Text>
              
            </View>
          )}
          ListFooterComponent={
            <>
            <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                     Total: $ {total.toFixed(2)}
                </Text>
                <Pressable onPress={()=> dispatch(clearCart())}>
                  <Text>Vaciar todo el carrito</Text>
                </Pressable>
            </View>
            <View>
              <Pressable style={[styles.button, styles.buttonOpen]} 
              onPress={()=>setModalVisible(true) }>
                <Text style={styles.textStyle}>COMPRAR</Text>
              </Pressable>
            </View>
            <ModalCheck
              total={total} 
              modalVisible={modalVisible} 
              setModalVisible={setModalVisible} 
              clearCart={()=>dispatch(clearCart())}/>
            </>
          }
        />        
      </View>
      )}      
    </View>
  );  

}
    

export default CarritoScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  containerCart: {
    flexDirection:'column',
    backgroundColor: '#f9f9f9',
    margin:10,
    padding:15,
    borderRadius:10,
    elevation:3,
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.1,
    shadowRadius:4
  },
  textProduct:{
    fontSize:18,
    fontWeight:'600',
    marginBottom:10,
    color:'#333'
  },
  countSection:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom:10
  },
  countButton:{
    backgroundColor:'#ddd',
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:5,
    marginHorizontal:5
  },
  quantity:{
    fontSize:16,
    fontWeight:'500',
    color:"#555"
  },
  price:{
    fontSize:16,
    fontWeight:'600',
    color:"#2a9d8f"
  },
  containerSecond:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  icon:{
    fontSize:20
  },
  button:{
    backgroundColor:'red',
    borderRadius:16,
    paddingVertical:15,
    paddingHorizontal:30,
    marginTop:10,
    marginBottom:20
    
  },
  textVacio:{
    fontSize:20,
    textAlign:'center',
    marginTop:30,
    textDecorationLine:'underline'
  },


 centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})