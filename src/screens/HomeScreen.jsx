import React, { useState, useEffect} from "react";
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import { loadFonts } from "../constants/fonts";
import {COLORS} from '../constants/colors'
import { SafeAreaView } from "react-native-safe-area-context";


const HomeScreen = ({navigation}) =>{

    const [fontsLoaded,setFontsLoaded] = useState(false)

    useEffect(() => {
     (async()=>{
        await loadFonts()
        setFontsLoaded(true)
     })(); 
      
    }, [])
    
    if (!fontsLoaded) return null

    return(
        <SafeAreaView style={styles.container}>
            <Image 
                source={{uri:'https://th.bing.com/th/id/R.40b3cdf6b5fbf206714e1c9ef23cee3c?rik=3Nswam8mfJsy5A&pid=ImgRaw&r=0'}}
                style= {styles.image}
                resizeMode="contain"    //ajuste para que la imagen se vea bien
                />   
                <Text style={styles.title}>
                    Bienvenidos a nuestra tienda app!
                </Text>
                
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
    image:{
        width:120,
        height:120,
        marginBottom:30,
        backgroundColor:'#f2f2f2',
    },
    title:{
        fontSize:24,
        // fontWeight:'bold',
        textAlign:'center',
        marginBottom:40,
        fontFamily:'mysteryQuest',
        color:COLORS.blanco
    },
    buttonContainer:{
        width:'100%',
        marginVertical:10,
        borderRadius:8,
        overflow:'hidden'
    }
})