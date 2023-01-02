import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://furniturecompany-001-site1.btempurl.com",
    credentials: "omit",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("token", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const rememberMe = JSON.parse(localStorage.getItem("rememberMe")) || false;

    if (!rememberMe) {
        api.dispatch(setCredentials({ username: null, accessToken: null }));
    } else {
        if (result?.error?.status === 403) {
            //send the refresh token to get new access token
            const refreshResult = await baseQuery(
                { url: "/auth/refresh", method: "POST", credentials: "include" },
                api,
                extraOptions
            );

            if (refreshResult?.data) {
                const username = api.getState().auth.username;
                const role = api.getState().auth.role;
                //store the new token
                api.dispatch(setCredentials({ ...refreshResult.data, username, role }));
                //retry the original query with new access token
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(setCredentials({ username: null, accessToken: null }));
            }
        }
    }

    return result;
};



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
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
