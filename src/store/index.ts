import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./feature/user/userSlice";
import { apiSlice } from "./feature/api/apiSlice";
import { postsReducer } from "./feature/posts/postSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: userReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
