import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from '../constants/colors'


const HomeScreen = () =>{

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.ContainerTitle}>
                <View>
                    <Text style={styles.title}>
                    Bienvenidos a {"\n"}Huella Market!
                </Text>
                <Text style={styles.subTitle}>
                    Todo para tu mascota, en casa
                </Text>
                </View>                
                <Image 
                source={{uri:'https://static.vecteezy.com/system/resources/previews/004/785/645/large_2x/animal-footprints-vector.jpg'}}
                style= {styles.image}
                resizeMode="contain"    //ajuste para que la imagen se vea bien
                />   
            </View>
            <View style={styles.containerSecond}>
                <Text style={styles.TextDescription}>
                    "Huella Market" es nuestra app para los amantes de los animales que quieren darle todo a sus mascotas.{'\n'}
                    Alimentos,Juguetes, Accesorios y más, encontrarás todo lo que tu mascota necesita sin salir de casa.{'\n'}
                    Con experincia simple, rapida y amigable podes explorar cientos de productos y hacer pedidos en segundos.{'\n'}
                    Ya sea que tengas un perro, un gato, un pez o algun roedor, en Huella Market lo tenemos cubierto.Porque tu mascota no es solo una mascota, es parte de tu famila!
                </Text>       
            </View>                
        </SafeAreaView>
    )
}

export default HomeScreen


const styles= StyleSheet.create({
    container:{
        flex:1,  //ocupa toda la pantalla
        padding:20,
        justifyContent:'center',
        backgroundColor:COLORS.negroClaro,
        alignItems:'center',
    },
    ContainerTitle:{
        flexDirection:"row",
        alignItems:"center",
        gap:40,
        marginBottom:30
    },
    image:{
        width:120,
        height:100,
        marginBottom:30,
        backgroundColor:'#f2f2f2',
        borderRadius:16,
    },
    title:{
        fontSize:40,
        textAlign:'center',
        fontFamily:'gentiumPlus',
        color:COLORS.blanco
    },
    subTitle:{
        color:COLORS.blanco,
        fontFamily:'gentiumPlus',
        textAlign:"center",
        fontSize:15
    },
    containerSecond:{
        backgroundColor:COLORS.azul,
        paddingVertical:20,
        paddingHorizontal:5,
        borderRadius:16
    },
    TextDescription:{
        padding:5,
        fontSize:18,
        color:COLORS.blanco,
    }
    
})