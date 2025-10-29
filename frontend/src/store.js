import {configureStore} from '@reduxjs/toolkit';
import {api} from './apiroute.js';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // other reducers...

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
});
export default store;
