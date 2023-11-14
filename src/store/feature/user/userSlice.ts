import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/types";
import { usersApiSlice } from "./userApiSlice";
import { RootState } from "../..";

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(usersApiSlice.endpoints.getUsers.matchFulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
  },
});

export const userReducer = userSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users
);
