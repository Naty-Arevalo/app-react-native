import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({ baseUrl:'https://app-prueba-df3e7-default-rtdb.firebaseio.com/'}),
    endpoints:(buider) =>({
        putProfilePicture: buider.mutation({
            query: ({image,localId}) =>({
                url:`profilesPictures/${localId}.json`,
                method:'PUT',
                body:{
                    image
                },
            })
        }),
        getProfilePicture: buider.query({
            query:(localId) =>`profilesPictures/${localId}.json`,
        })
    }),
});

export const {usePutProfilePictureMutation, useGetProfilePictureQuery} = userApi