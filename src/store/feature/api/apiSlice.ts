import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/api",
  }),
  //Defines the overall categories of tags that your endpoints will use
  tagTypes: ["Post", "id", "User"],
  endpoints: () => ({}),
});
