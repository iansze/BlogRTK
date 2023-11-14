import { sub } from "date-fns";
import { Post } from "../../../types/types";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData: Post[]) => {
        let min = 1;
        return responseData.map((post: Post) => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
      },
      //This data belongs to this category, and here's a specific identifier for it
      //For Caching and invalidation
      providesTags: (result: Post[] | undefined) => [
        { type: "Post", id: "LIST" },
        ...(result ? result.map(({ id }) => ({ type: "Post" as const, id })) : []),
      ],
    }),
    addNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...post,
          userId: post.userId,
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      //Specify which tags should be considered outdated or invalid after a mutation
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: {
          ...post,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      //Optimistic updates => update the cache immediately, and then undo the update if the mutation fails
      async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        // Dispatch => perform an optimistic update
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === postId);
            if (post) {
              post.reactions = reactions;
            }
          })
        );
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      // Optimistic updates change the data immediately for a responsive UI,
      // but they don't guarantee the data is correct according to the server's perspective.
      // invalidatesTags ensures that, after a mutation, the data is refetched automatically if needed,
      // keeping the client and server states in alignment.
      invalidatesTags: (arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = postApiSlice;
