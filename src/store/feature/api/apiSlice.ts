import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  //Defines the overall categories of tags that your endpoints will use
  tagTypes: ["Post", "id", "User"],
  endpoints: () => ({}),
});
