import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen'
import InfoScreens from '../screens/InfoScreens'
import SettingsScreens from '../screens/SettingsScreens'
import ProductsScreen from "../screens/ProductsScreen";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator 
            screenOptions={{headerShown:true}}>
          <Stack.Screen 
            name='home' 
            component={HomeScreen}/>
        </Stack.Navigator>
    )
}