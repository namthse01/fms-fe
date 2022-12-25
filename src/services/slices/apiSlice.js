import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://furniturecompany-001-site1.btempurl.com",
    credentials: "omit",
    // prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token;
    //     if (token) {
    //         headers.set("token", `Bearer ${token}`);
    //     }
    //     return headers;
    // },
});



export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});

// import axios from 'axios';


// const instance = axios.create({
//     baseURL: "https://furnituremanagementservice.azurewebsites.net",
//     // withCredentials: false
// });

// instance.interceptors.response.use(
//     (response) => {
//         const { data } = response;
//         return response.data;
//     }
// )

// export default instance;
