import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import { useGetProductsByCategoryQuery } from '../service/shopService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import {COLORS} from '../constants/colors'
import Toast from 'react-native-toast-message';


export default function ProductosScreen({ route}) {
  const { categoriaId, nombre } = route.params;
  const {data:productos, error, isLoading} = useGetProductsByCategoryQuery(categoriaId)
  const [productosLista,setProductosLista] = useState([])
  const dispatch = useDispatch()


   useEffect(() => {
    if (productos) {
      let productosArray = [];
      // Recorremos cada subcategoría (accesorios, alimentos, ropa)
        Object.keys(productos).forEach(subcategoria => {
        Object.values(productos[subcategoria]).forEach(producto => {
          productosArray.push(producto);
        });
      });
      setProductosLista(productosArray);
    }
  }, [productos]);

  const handleAgregarAlCarrito = (item)=>{
    dispatch(addToCart(item))
    Toast.show({
      type:'success',
      text1:`${item.nombre} Agregado al Carrito!`,
      position:'bottom',
      visibilityTime:2000
    })
  }


  if (isLoading) return <Text style={styles.loading}>Cargando productos de {nombre}...</Text>;
  if (error) return <Text style={styles.loading}>Error: {error}</Text>;
  if (!productos) return <Text style={styles.loading}>No hay productos.</Text>;

  return (
    
    <FlatList
      data={productosLista}
      keyExtractor={(item, index) => item.id || index.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.tipoContainer}>
          <View style={styles.card}>
            <Image
            source={{uri:item.image}}
            resizeMode='contain'
            style={styles.image}
            />
            <Text style={styles.text}>{item.nombre} </Text>
            <Text style={styles.text}>${item.precio}</Text>
            <View style={styles.conteinerButton}>
            <TouchableOpacity onPress={()=> handleAgregarAlCarrito(item)} style={styles.button}>
              <Text style={styles.textButton}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
            
          </View>              
          
        </View>
       
      )}
    />

  );
}


const styles = StyleSheet.create({
  loading: {
     padding: 20,
      fontSize: 18
     },
  tipoContainer: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ccc',
    backgroundColor:COLORS.negroClaro
     
  },
  tipoTitulo: { 
    fontSize: 20,
     fontWeight: 'bold' 
    },
  producto: { 
    marginLeft: 10, 
    marginTop: 5 
  },
  image:{
    width:150,
    height:150,
    borderRadius:16,
    backgroundColor:COLORS.gris

  },
  card:{
    backgroundColor:COLORS.gris,
    borderRadius:16,
    elevation:5,
    overflow:'hidden',
    padding:7,
    shadowColor:'white',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.5,
    shadowRadius:6,
    justifyContent:'center',
    alignItems:'center'
   
  },
  text:{
    fontSize:16,
    fontWeight:'600',
    color:COLORS.negro,
    padding:2,
    marginTop:5
  },
  button:{
    backgroundColor:COLORS.azul,
    borderRadius:16,
    paddingVertical:15,
    paddingHorizontal:30,
    marginTop:10,
  },
  textButton:{
    color:COLORS.blanco,
  }
});