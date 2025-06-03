import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
    reducerPath:'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl:'https://app-prueba-df3e7-default-rtdb.firebaseio.com/' }),
    endpoints: (buider) =>({
        getCategories: buider.query({
            query: () => 'categories.json' ,
        }),
        getProductsByCategory : buider.query({
            query: (categoriaId)=> `products/${categoriaId}.json`,
        })
    })
})

export const {useGetCategoriesQuery, useGetProductsByCategoryQuery} = shopApi