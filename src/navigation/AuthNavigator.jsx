import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SingupScreen from '../screens/auth/SingupScreen'


const Stack = createNativeStackNavigator()

const AuthNavigator = ()=>{
    return (
        <Stack.Navigator screenOptions= {{headerShown:false}}>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Singup' component={SingupScreen}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator