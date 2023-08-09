import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = import.meta.env.VITE_BASE_URL


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
        }),

        getCryptoExchanges: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}/exchanges`)
        })
    })
})

export const {
    // redux will create a hook out of 'getCryptos' specified on endpoind
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery
} = cryptoApi; // The hook will be coming for cryptoApi
