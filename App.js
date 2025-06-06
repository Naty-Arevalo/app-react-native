import {Provider} from 'react-redux'
import { store } from "./src/store/store";
import RootStack from './src/navigation/RootStack'
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { loadFonts } from './src/constants/fonts';

//funcion para inicializar la base de datos
export const initializeDB= async(db) =>{
  try {
    //crea la tabla 
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    localId TEXT NOT NULL
  );
`);
    console.log('base de datos creada')
  } catch (error) {
    console.log('error al inicializar la base de datos')
  }
}

  
export default function App(){

 const [fontsLoaded,setFontsLoaded] = useState(false)

    useEffect(() => {
     (async()=>{
        await loadFonts()
        setFontsLoaded(true)
     })(); 
      
    }, [])
    
    if (!fontsLoaded) return null



  return(
    <SQLiteProvider databaseName="app-prueba" onInit={initializeDB}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootStack/>
          <StatusBar style="light"/>
        </Provider>
      </SafeAreaProvider>  
    </SQLiteProvider>
  )
}

// toda la app va a tener acceso a la base de datos


   //limpia cualquier version previa en la tabla: se debe poner al principio del try de la: const initializeDB
    // await db.execAsync ('DROP TABLE IF EXISTS sessions');
    // console.log('tabla anterior eliminada (si existia)')