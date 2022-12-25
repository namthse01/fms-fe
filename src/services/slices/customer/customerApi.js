import { apiSlice } from "../apiSlice";

export const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // CustomerById
        getCustomerById: builder.query({
            query: (customerId) => `/api/customer/getCustomerDetailById/${customerId}`,
            method: "GET",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        }),

        // ALl Customer
        getAllCustomers: builder.query({
            query: () => "/api/customer/getAllCustomer",
            method: "GET",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        }),
    })
});

export const { useGetCustomerByIdQuery, useGetAllCustomersQuery } = customerApi;


// import axios from '../axios';

// const getAllCustomers = () => {
//     return axios.get(`/api/customer/getAllCustomer`);
// }

// const getCustomerById = (customerId) => {
//     return axios.get(`/api/customer/${customerId}`);
// }

// export {
//     getAllCustomers,
//     getCustomerById
// }