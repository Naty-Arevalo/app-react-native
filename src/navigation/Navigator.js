
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen'
import CategoriesStack from './CategoriesStack';
import HomeScreen from '../screens/HomeScreen';
import CarritoScreen from '../screens/CarritoScreen';
import { COLORS } from '../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import CartTAbIcon from '../components/CartTabIcon';


const Tab = createBottomTabNavigator();

export default function Navigator(){

    return(
        <Tab.Navigator
            screenOptions={{
                headerShown:true,
                headerTitleAlign:'center',
                tabBarActiveTintColor:COLORS.azul,
                tabBarInactiveTintColor:COLORS.blanco,
                tabBarInactiveBackgroundColor:COLORS.negroClaro,
                headerTitleStyle:{
                    fontSize:25,
                    color:COLORS.azul,
                },
                headerStyle:{
                    backgroundColor:COLORS.negro
                },
                
                tabBarStyle:{
                    backgroundColor:COLORS.negro,
                    borderTopWidth:1
                }
               
                        
            }}
        >
            <Tab.Screen 
                name='Mi Tienda' 
                component={HomeScreen} 
                options={{
                    tabBarIcon:({focused})=>(
                        <Ionicons
                        name="storefront"
                        size={32}
                        color={focused ? COLORS.azul : COLORS.blanco }
                        />
                )
                }}
            />
            <Tab.Screen 
                name='Categorias de la Tienda' 
                component={CategoriesStack}
                options={{
                    tabBarIcon:({focused})=>(
                        <AntDesign
                        name="appstore1"
                        size={32}
                        color={focused ? COLORS.azul : COLORS.blanco }
                        />
                )
                }}
                />    
            <Tab.Screen 
                name='Perfil' 
                component={ProfileScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <FontAwesome6
                        name="user-large"
                        size={32}
                        color={focused ? COLORS.azul : COLORS.blanco }
                        />
                )
                }}
                /> 
            <Tab.Screen 
                name='Carrito' 
                component={CarritoScreen}
                options={{
                    tabBarIcon:( {focused})=>(
                        <CartTAbIcon focused={focused}/>
                        
                )
                }}
                />  
                  
            
        </Tab.Navigator>
    )
}