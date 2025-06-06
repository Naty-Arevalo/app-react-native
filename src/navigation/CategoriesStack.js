import react from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InfoScreeen from '../screens/InfoScreens'
import ProductosScreen from '../screens/ProductsScreen'
import { COLORS } from '../constants/colors'

const Stack = createNativeStackNavigator()

export default function CategoriesStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown:true,
            headerStyle:{
                height:60,
                backgroundColor:COLORS.negroClaro
            },
            headerTitleStyle:{
                color:COLORS.blanco,
                fontSize:20
            },
            headerTintColor:COLORS.blanco
            }}>
            
            <Stack.Screen 
            name='Buscá el producto en base a tu mascota!' 
            component={InfoScreeen} 
            />
            <Stack.Screen name= 'productos' component={ProductosScreen} 
                options={
                    ({route}) => ({title: route.params.nombre})
            }/>

        </Stack.Navigator>
    )
}