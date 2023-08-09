import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '3f8a893e1dmsh6502d7d4c2ec87dp1ed1ebjsnb3be44741e6c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'


// utility function to add url and header
const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    // what is this reducer for
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    // defining endpoints
    endpoints: (builder) => ({
        getCryptos: builder.query({
            // created a object with path as '/coins'. we receive count from 'useGetCryptosQuery' hook
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod})=> createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        })
    })
})

export const {
    // redux will create a hook out of 'getCryptos' specified on endpoind
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi; // The hook will be coming for cryptoApi
