import {useEffect} from "react";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import { useGetProfilePictureQuery} from "../service/userService";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "../components/CameraIcon";
import { usePutProfilePictureMutation } from "../service/userService";
import { setProfilePicture } from "../features/user/userSlice";
import { clearUser } from "../features/auth/authSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import {COLORS} from '../constants/colors'


export default function ProfileScreen() {

  const db = useSQLiteContext();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.value.email);
  const localId = useSelector((state) => state.authReducer.value.localId);
  const image = useSelector((state) => state.userReducer.value.profilePicture);

  const {data:profilePicture, isLoading,error} =  useGetProfilePictureQuery(localId)

useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
         }
     },[profilePicture])

  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();

  //permiso para acceder a la camara
  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    const isPermissionOk = await verifyCameraPermissions();

    if (isPermissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, //permite editar
        aspect: [1, 1],
        base64: true, //guardar en modo texto para guardarlo en firebase
        quality: 0.6,
      });

      if (!result.canceled) {
        dispatch(
          setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
        triggerPutProfilePicture({
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          localId,
        });
      }
    }    
  };
  
 // constante para cerrar sesion
  const logout = async () => {
      try {
        const result = await db.runAsync(
          "DELETE FROM sessions WHERE localId=$localId",
          { $localId: localId } 
        );
        dispatch(clearUser());
        console.log("sesion cerrada",  result)
      } catch (error) {
        console.log("error al cerrar la sesion", error);
      }
    };

    //constante para cambiar contraseña
    const handleChangePassword = ()=>{
       Alert.alert(
          "Correo enviado!",
          "Te enviamos un email para reestablecer la contraseña",
          [{text: "ok", style:"default"}]
        )
    }
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.emailText}>Hola! {user}</Text>
      <View style={styles.avatarContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Pressable onPress={pickImage} style={styles.cameraIcon}>
          <CameraIcon/>
          
        </Pressable>
      </View>
      <View style={styles.containerOptions}>
        <Pressable onPress={logout} style={styles.optionButton}>
          <Icon name="logout" size={32} color={COLORS.azul} />
          <Text style={styles.optionText}>Cerrar sesión</Text>
        </Pressable>
      </View>
      <View style={styles.containerOptions}> 
        <Pressable style={styles.optionButton} 
        onPress={()=>{handleChangePassword()}}>
          <Icon name="lock" size={24} color={COLORS.azul} />
          <Text style={styles.optionText}>Cambiar contraseña</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    backgroundColor:COLORS.negroClaro
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: COLORS.gris,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.gris,
    borderRadius: 20,

  },
  emailText: {
    fontSize: 20,
    color: COLORS.blanco,
    marginBottom: 30,
  },
  containerOptions: {
    width: "80%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gris,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },

});
