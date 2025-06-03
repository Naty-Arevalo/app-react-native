import { createSlice, createSelector } from "@reduxjs/toolkit";

//para sumar el total final del carrito
// Selector base: devuelve el array de items
export const selectCartItems = (state) => state.cart.items;

// Selector memorizado: calcula el total solo si items cambió
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
);
//cantidad de elementos en el carrito, para su notificacion
export const selectTotalQuantity = createSelector(
    [selectCartItems],
    (items) =>items.reduce((sum,item) => sum + item.cantidad, 0)

)

const initialState= {
    items:[]
}; 
export const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            console.log('agregando al carrito', action.payload)
            const item= action.payload;
            const existing= state.items.find(i => i.id === item.id);
            if(existing){
                existing.cantidad += 1
            } else {
                state.items.push ( {...item, cantidad:1} );
            }
        },
        increaseQuantity(state,action){
            const item= state.items.find(i => i.id === action.payload.id)
            if(item){
                item.cantidad += 1
            }
        },
        decreaseQuantity(state,action){
            const item = state.items.find (i => i.id === action.payload.id)
            if(item && item.cantidad > 1){
                item.cantidad -=1
            }
        },
        removeFromCart(state,action){
            state.items = state.items.filter(i => i.id !== action.payload.id);
        },

        clearCart(state){
            state.items = [];
        },
        precioTotal(state){
            state.items.reduce((acc,prod) => acc + prod.precio * prod.cantidad, 0)
        },
        fetchCartFulfilled(state,action){
            state.items= action.payload || [];
        }
    },
    
})

export const {addToCart, removeFromCart, clearCart,increaseQuantity,decreaseQuantity, fetchCartFulfilled} = cartSlice.actions
export default cartSlice.reducer


//addToCart, removeFromCart, clearCart son las acciones que se exportaran para usar en otros componentes, serian el cartContext de react
//una vez hecho se agrega el reduce al store para que este en toda la app