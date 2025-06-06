# App-Prueba  E-Commerce 

* Proyecto de una app de un comercio básica, desarrollado para mi formación, La app empieza con una autenticación, ingreso a la app, se recorren las categorias, el perfil, se pueden agregar productos al carrito y simular una compra. 

# Tecnologías Utilizadas:
* React Native con Expo
* Firebase - Para autenticación y base de datos en tiempo real
* Redux Toolkit + RTK Query - para el manejo del estado global y sincronización con la base de datos
* SQLite - Base de datos local para el almacenamiento persistente de datos
* React Navigation - para la navegación entre pantallas 



# Estructura del proyecto:

/app-prueba/
|- /assets/ ---         *fuentes descargadas*
|- /src/ 
|---/components/       *componentes reutilizables*
|---/constants/        *usos globlales de colors y fonts*
|---/features/            *Slices de ReduxToolkit* 
        > authSlice
        > cartSlice
        > counterSlice
        > userSlice
|---/firebase/        *configuración de firebase*
|---/navigation/           *navegación principal*
        > authNavigation
        > CategoriesStack
        > HomeStack
        > Navigator
        > RootStack
|---/screens/          *pantallas de la app*
    > loguinScreen
    > SingupScreen
    > carritoScreen
    > HomeScreen
    > InfoScreen
    > ProductsScreen
    > ProfileScreen
|---/service/         *servicios de API usando RTK Query*
    > auth.service
    > CartService
    > shopService
    > userService
|---/store/       *configuración del store de Redux*
|- App.js          *punto de entrada*
|- package.json
|- README


## Como ejecutar el proyecto:
1- **Clonar el repositorio**  
git clone https://github.com/Naty-Arevalo/app-react-native.git
2- **instalar dependencias**
npx expo install
3- **iniciar con Expo**
npm start





