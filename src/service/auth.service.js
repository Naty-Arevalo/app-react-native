import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({ baseUrl:"https://identitytoolkit.googleapis.com/v1/"}),
    endpoints:(builder) =>({
        singup: builder.mutation({
            query:(auth) => ({
                url:"accounts:signUp?key=AIzaSyDUb7uoLx8Gh6tAgBD6ucnaBivPsuQidQY",
                method:"POST",
                body:auth
            })
        }),
        login: builder.mutation ({
            query: (auth) => ({
                url:"accounts:signInWithPassword?key=AIzaSyDUb7uoLx8Gh6tAgBD6ucnaBivPsuQidQY",
                method:"POST",
                body:auth
            })
        })
    })
})

export const {useSingupMutation, useLoginMutation} = authApi