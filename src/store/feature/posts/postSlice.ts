import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../types/types";
import { postApiSlice } from "./postsApiSlice";
import { RootState } from "../..";

const postsAdapter = createEntityAdapter<Post>();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  //Normalization data from postApiSlice.endpoints.getPosts
  //and store it in the state using the adapter
  extraReducers: (builder) => {
    builder.addMatcher(postApiSlice.endpoints.getPosts.matchFulfilled, (state, action) => {
      postsAdapter.setAll(state, action.payload);
    });
    builder.addMatcher(postApiSlice.endpoints.addNewPost.matchFulfilled, (state, action) => {
      postsAdapter.addOne(state, action.payload);
    });
    builder.addMatcher(postApiSlice.endpoints.updatePost.matchFulfilled, (state, action) => {
      postsAdapter.upsertOne(state, action.payload);
    });
    builder.addMatcher(postApiSlice.endpoints.deletePost.matchFulfilled, (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    });
  },
});

export const postsReducer = postsSlice.reducer;

//Denormalization data from the state using the adapter
export const { selectAll: selectAllPosts, selectById: selectPostById } = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);
