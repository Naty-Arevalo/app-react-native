import react from 'react'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CameraIcon =()=> {
    return(
        <View style={styles.container}>
            <Icon name='photo-camera' size={20} color='#fff'/>
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey',
        width:48,
        height:48,
        borderRadius:32
    }
})