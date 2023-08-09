import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
   },
//    We need to specify middleWare. Adding default Middleware
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware)
});