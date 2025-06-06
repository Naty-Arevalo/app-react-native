import {View, ActivityIndicator} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../service/CartService";
import AuthNavigator from './AuthNavigator'
import Navigator from './Navigator'
import Toast from 'react-native-toast-message'


const RootStack = ()=>{
    const user = useSelector(state=> state.authReducer.value.email)
    const localId = useSelector(state => state.authReducer.value.localId);

     const { isLoading: loadingCart } = useGetCartQuery(localId); 

     if (loadingCart) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
    return(
      
        <NavigationContainer>
            <>
            {
                user? <Navigator/> : <AuthNavigator/>
            }
            <Toast/>
            </>
        </NavigationContainer>
        
        
    )
}

export default  RootStack
