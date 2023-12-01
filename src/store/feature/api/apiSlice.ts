import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  //Defines the overall categories of tags that your endpoints will use
  tagTypes: ["Post", "id", "User"],
  endpoints: () => ({}),
});
