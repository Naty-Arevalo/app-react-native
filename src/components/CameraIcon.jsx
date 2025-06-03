import react from 'react'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../constants/colors'


const CameraIcon =()=> {
    return(
        <View style={styles.container}>
            <Icon name='photo-camera' size={20} color={COLORS.azul}/>
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.blanco,
        width:48,
        height:48,
        borderRadius:32
    }
})