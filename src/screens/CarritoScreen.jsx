import react, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Image, TouchableOpacity} from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import  { removeFromCart,selectCartTotal, increaseQuantity,decreaseQuantity, clearCart, fetchCartFulfilled } from "../features/cart/cartSlice";
import { useGetCartQuery,useSetCartMutation } from "../service/CartService";
import ModalCheck from "../components/ModalCheck";
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from "../constants/colors";


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
    dispatch(fetchCartFulfilled(remoteCart)); 
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerCart}>

              <View style={styles.containerSecond}>
                
                <Image
                    source={{uri:item.image}}
                    resizeMode='contain'
                    style={styles.image}
                />
                <Text style={styles.textProduct}>{item.nombre}</Text>
                <Pressable onPress={()=> dispatch(removeFromCart( {id: item.id}))} >
                  <AntDesign name="delete" size={24} color="black" />
                </Pressable>
              </View>  

              <View style={styles.countSection}>
                <TouchableOpacity style={styles.countButton} onPress={()=>dispatch(decreaseQuantity({ id: item.id}))}>
                  <Text style={styles.countText}>-</Text>
                </TouchableOpacity>
                 <Text style={styles.quantity}>{item.cantidad}</Text>
                <TouchableOpacity style={styles.countButton} onPress={()=>dispatch(increaseQuantity({ id: item.id}))}>
                  <Text style={styles.countText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.price}> ${((item.precio * item.cantidad).toFixed(2))}</Text>
              
            </View>
          )}
          ListFooterComponent={
            <>
            <View style={{ padding: 20 }}>
                <Text style={styles.textTotal}>
                    Total: $ {total.toFixed(2)}
                </Text>
                <Pressable onPress={()=> dispatch(clearCart())}>
                  <Text style={styles.textVaciar}>Vaciar carrito</Text>
                </Pressable>
            </View>
            <View style={{ alignItems:"center"}}>
              <TouchableOpacity style={styles.button} 
              onPress={()=>setModalVisible(true) }>
                <Text style={styles.textStyle}>COMPRAR</Text>
              </TouchableOpacity>
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
    backgroundColor:COLORS.negroClaro,
  },
  containerSecond:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  containerCart: {
    flexDirection:'column',
    backgroundColor: COLORS.gris,
    margin:10,
    padding:15,
    borderRadius:10,
    elevation:3,
    shadowColor:COLORS.blanco,
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
  image:{
    width:60,
    height:60,
    backgroundColor:COLORS.gris
  },
  countSection:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom:10,
    marginTop:10
  },
  countButton:{
    backgroundColor:'#ddd',
    paddingHorizontal:10,
    paddingVertical:3,
    borderRadius:5,
    marginHorizontal:5
  },
  quantity:{
    fontSize:16,
    fontWeight:'700',
    color:"#555"
  },
  price:{
    fontSize:18,
    fontWeight:'bold',
    color:COLORS.blanco,
    textAlign:"right"
  },
  textTotal:{
    color:COLORS.blanco,
    fontSize:25,
    textAlign:'right'
  },
  textVaciar:{
    fontSize:18,
    color:COLORS.blanco,
    textDecorationLine:"underline"
  },
  
  button:{
    backgroundColor:COLORS.azul,
    borderRadius:16,
    paddingVertical:15,
    // paddingHorizontal:30,
    marginTop:10,
    marginBottom:20,
    width:"80%",
    alignItems:"center"
  },
  textVacio:{
    fontSize:20,
    textAlign:'center',
    marginTop:30,
    textDecorationLine:'underline'
  },

})