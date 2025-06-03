import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../service/shopService";
import { authApi } from "../service/auth.service";
import { userApi } from "../service/userService";
import { cartApi } from "../service/CartService";
import authReducer from "../features/auth/authSlice";
import userReducer from '../features/user/userSlice';
import cartReducer from "../features/cart/cartSlice";
import counterReducer from "../features/counter/counterSlice"


export const store= configureStore({
 
    reducer:{
        authReducer,
        userReducer,
        cart: cartReducer,
        counter: counterReducer,

        [shopApi.reducerPath] : shopApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [cartApi.reducerPath] : cartApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware).concat(userApi.middleware).concat(cartApi.middleware)
})
