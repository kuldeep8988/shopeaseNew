import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import CartSlice from "./Slice/CartSlice";
import wishLIstslice from "./Slice/wishLIstslice";
import { combineReducers } from "redux";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    cart: CartSlice,
    wish: wishLIstslice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
