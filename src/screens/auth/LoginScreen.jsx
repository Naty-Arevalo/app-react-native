import React, { useEffect, useState } from "react";
import {  View,StyleSheet,TextInput, TouchableOpacity,Text,Pressable} from "react-native";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../service/auth.service";
import { useSQLiteContext } from "expo-sqlite";  //acceder a la base de datos
import { setUser } from "../../features/auth/authSlice";
import { COLORS } from "../../constants/colors";



export default function LoginScreen({navigation}) {

    
    const db= useSQLiteContext()  //toma la db creada en app.js
    const dispatch = useDispatch() // funcion que dispara una accion

    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const [triggerLogin, result] = useLoginMutation()

    const unSubmit = ()=>{
        //console.log("presionaste email",email, 'pasword', password)
        triggerLogin({email, password})
     }

     const [loginError, setLoginError] = useState('')

     //este useEffect es para que guarde el usuario en la base de datos
     useEffect(()=>{
        async function setup(){
            const result = await db.getFirstAsync('SELECT * FROM sessions')
            console.log('usuarios en db:', result)
            if(result.email){
                dispatch(setUser({email: result.email, localId: result.localId})) //esto es porque en appJs pusimos esto: db.exesAsync('CREATE TABLE IF NOT EXISTS sessions (id INTERGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, localId TEXT NOT NULL');
            }
        }
        setup()
     },[])

     //funcion para guardar el usuario en la base de datos
     const saveUserInDB = async (email, localId) =>{
        try {
            const result = await db.runAsync('INSERT INTO sessions (email, localId) VALUES (?,?)', email, localId)
            console.log('usuario agregado con exito en la db', result)
        } catch (error) {
            console.log('error al guardar el usuario en la db', error)
        }
     }


     //este useEffect es para corroborar que el mail y la contraseña sean correctas, si coinicide estas adentro, sino error consologueado
     //aca hay que agregarle la const saveUserInDB
     useEffect(()=>{
        async function saveUser(){
            if (result.status=='fulfilled'){               // si el usuario es fulfilled
            dispatch(setUser(result.data))                  // despachamos el usuario
            await saveUserInDB(result.data.email, result.data.localId)      // y lo guardamos en la base de datos con su email y su localId
        }else if (result.status =='rejected'){
            setLoginError('Email o password incorrecto')
        }
    }
    saveUser()    
     },[result])


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Huella Market</Text>
        <Text style={styles.iniciarSesion}>Iniciar Sesion</Text>
        <View style={styles.tarjeta}>
            <TextInput
            onChangeText={(text) =>setEmail(text)}
            placeholderTextColor= {COLORS.blanco}
            placeholder="Email" 
            style={styles.input}
            />
            <TextInput
            onChangeText={(text) =>setPasword(text)}
            placeholderTextColor={COLORS.blanco}
            placeholder="Pasword" 
            style={styles.input}
            secureTextEntry
            />
            {loginError !== '' && (<Text style={styles.errorText}>{loginError}</Text>)}
            <View style={styles.boxSingup}>
                <Text style={styles.textBoxSingup}>No tienes una cuenta?</Text>
                <Pressable onPress={()=> navigation.navigate('Singup')}>
                    <Text style={[styles.textBoxSingup, styles.singup]}>Crea Una</Text>
                </Pressable>
            </View>
        </View>
        <TouchableOpacity onPress={unSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.negroClaro
    },
    title:{
        fontSize:50,
        padding:10,
        color:COLORS.azul,
        fontFamily:'gentiumPlus'
    },
    iniciarSesion:{
        marginTop:20,
        fontSize:24,
        color:COLORS.blanco,
        fontFamily:'gentiumPlus'
    },
    tarjeta:{
        margin:20,
        backgroundColor:COLORS.gris,
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:COLORS.blanco,
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    input:{
        padding:10,
        borderRadius:16,
        backgroundColor:COLORS.azul,
        margin:5
    },
    errorText:{
        color:'red',
        fontSize:16,
        textAlign:'center'
    },
    boxSingup:{
        flexDirection:'row',
        justifyContent:'center',
        gap:10,
  },
  textBoxSingup:{
    marginTop:5
  },
  singup:{
    color: 'blue',
    fontWeight:'800',
    textDecorationLine:'underline'
  },
  button:{
    backgroundColor:COLORS.azul,
    borderRadius:16,
    paddingVertical:15,
    paddingHorizontal:30,
    marginTop:20
    
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold'
  }
});
  
