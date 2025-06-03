import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://app-prueba-df3e7-default-rtdb.firebaseio.com/' }),
  tagTypes:['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => `carrito/${userId}.json`,
      providesTags: ['Cart'],
    }),
    setCart: builder.mutation({
      query: ({ userId, items }) => ({
        url: `carrito/${userId}.json`,
        method: 'PUT',
        body: items,
      }),
      invalidatesTags:['Cart']
    }),
  }),
});



export const {useGetCartQuery,useSetCartMutation} = cartApi
