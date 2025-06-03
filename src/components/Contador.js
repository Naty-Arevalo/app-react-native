import react from 'react'
import {View, Text,Pressable, StyleSheet} from 'react-native'
import { increment, decrement } from '../features/counter/counterSlice'
import { useSelector, useDispatch } from 'react-redux'


export default function Contador(){
    const count = useSelector(state => state.counter.value)
    const dispatch= useDispatch()

    return(
        <View style={styles.container}>
            <View style={styles.containerCount}>
                <Pressable onPress={()=>dispatch(decrement())}>
                    <Text style={styles.textCount}>-</Text>
                </Pressable>
            </View>
            <View>
                <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.containerCount}>
                <Pressable onPress={()=>dispatch(increment())}>
                    <Text style={styles.textCount}>+</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles= StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#807d83',
        justifyContent:'space-between'
    },
    containerCount:{
        backgroundColor:'red',
        borderRadius:8,
        padding:8,
        marginHorizontal:3,
        marginHorizontal:8,
        width:30,
        alignItems:'center',
        justifyContent:'center'
    },
    textCount:{
        fontSize:18,
        fontWeight:'bold'
    },
    count:{
        fontSize:20,
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center',
        padding:5
    }

})