import { useEffect, useState } from "react";
import {Dimensions, Pressable, Text, TextInput, View, StyleSheet} from "react-native";
import { useSingupMutation } from "../../service/auth.service";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SingupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [repeatPasword, setRepitPasword] = useState("");
  const [errorPassword, setErrorPassword] = useState('')
  const[errorEmail, setErrorEmail] = useState('')


  const [triggerSingup, result] = useSingupMutation();
  console.log(result);

  const isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const onSubmit = () => {
    
      let hasError= false

    if (!isValidEmail(email)){
      setErrorEmail("El email no es válido")
      hasError= true
    }

    if (password !== repeatPasword){
      setErrorPassword("Las contraseñas no coinciden")
      hasError= true
    }
    if(hasError) return;

    triggerSingup({ email, password });
    
    
  };

  useEffect(() => {
    if (result.status == "fullfilled") {
      navigation.navigate("login");
    } else if (result.status == "rejected") {
      console.log("se produjo un error al crear el usuario");
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>La App de Naty</Text>
      <Text>Registrate</Text>
      <View style={styles.tarjeta}>
        <TextInput
          onChangeText={(text) => {
            setEmail(text)
            if(errorEmail && isValidEmail(text)){
              setErrorEmail("")
            }
          }}
          onFocus={() => {
    // Esto limpia el error al volver a tocar el input
    if (errorEmail) {
      setErrorEmail("");
    }
  }}
          onBlur={()=>{
            if (!isValidEmail(email)){
              setErrorEmail("El email no es valido")
            }
          }}
            
          placeholderTextColor="#ebebeb"
          placeholder="Email"
          style={styles.input}
        />
        {errorEmail !== "" && <Text style={styles.errorText}>{errorEmail}</Text>}

        <TextInput
          onChangeText={(text) =>  setPasword(text)}
          onFocus={()=>{
            if (!isValidEmail(email)){
              setErrorEmail ("el email no es valido")
            }
          }} 
          
          placeholderTextColor="#ebebeb"
          placeholder="Pasword"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => {
             setRepitPasword(text)
             setErrorPassword("")
          }
           }
          placeholderTextColor="#ebebeb"
          placeholder="Pasword"
          secureTextEntry
          style={styles.input}
        />
        {errorPassword !== "" && (<Text style={styles.errorText}>{errorPassword}</Text>)
        }
      </View>
      <View>
        <View style={styles.boxSingup}>
          <Text>Ya tienes una cuenta??</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.singup}>Iniciar Sesion</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </Pressable>
    </View>
  );
};
export default SingupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  errorText:{
        color:'red',
        fontSize:16,
        textAlign:'center'
    },
    tarjeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    input:{
        padding:10,
        borderRadius:16,
        backgroundColor:'violet',
        margin:5
    },
     boxSingup:{
        flexDirection:'row',
        justifyContent:'center',
        gap:10,
  },
   singup:{
    color: 'blue',
    fontWeight:'800',
    textDecorationLine:'underline'
  },
  button:{
    backgroundColor:'red',
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
