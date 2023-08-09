import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '3f8a893e1dmsh6502d7d4c2ec87dp1ed1ebjsnb3be44741e6c',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

// utility function to add url and header
const createRequest = (url) => ({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    // what is this reducer for
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    // defining endpoints
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count })=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    // redux will create a hook out of 'getCryptoNews' specified on endpoind
    useGetCryptoNewsQuery,
} = cryptoNewsApi; // The hook will be coming for CryptoNewsApi

