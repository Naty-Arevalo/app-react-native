import React ,{useEffect} from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CameraIcon from "../components/CameraIcon";
import * as ImagePicker from "expo-image-picker";
import { setProfilePicture } from "../features/user/userSlice";
import { usePutProfilePictureMutation } from "../service/userService";
import { useSQLiteContext } from "expo-sqlite";
import { clearUser } from "../features/auth/authSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useGetProfilePictureQuery} from "../service/userService";

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
    console.log("pickimage se ejecuto");

    const isPermissionOk = await verifyCameraPermissions();
    console.log("permiso ok:", isPermissionOk);

    if (isPermissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, //permite editar
        aspect: [1, 1],
        base64: true, //guardar en modo texto para guardarlo en firebase
        quality: 0.6,
      });
      console.log("resultado camara:", result);

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
      } catch (error) {
        console.log("error al cerrar la sesion", error);
      }
    };


  return (
    <View style={styles.profileContainer}>
      <Text style={styles.emailText}>Hola: {user}</Text>
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
      <Pressable onPress={logout}>
        <Icon name="logout" size={32} color={"blue"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    backgroundColor: "#f2f2f2",
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
    backgroundColor: "#7e57c2",
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
    backgroundColor: "red",
    borderRadius: 20,
    // padding: 10,
    // zIndex: 10,
  },
  emailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
});
