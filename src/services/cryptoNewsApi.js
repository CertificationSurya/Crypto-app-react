import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = import.meta.env.VITE_BASE_URL_NEWS

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

