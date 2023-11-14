import { apiSlice } from "../api/apiSlice";
import { User } from "../../../types/types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result: User[] | undefined) => [
        { type: "User", id: "LIST" },
        ...(result ? result.map(({ id }) => ({ type: "User" as const, id })) : []),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
