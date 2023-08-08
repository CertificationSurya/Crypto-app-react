import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer
   },
//    We need to specify middleWare. Adding default Middleware
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cryptoApi.middleware)
});