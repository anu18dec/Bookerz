import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// configuring redux-persist

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => {
        return [thunk];
    },
});

export const persistor = persistStore(store);
