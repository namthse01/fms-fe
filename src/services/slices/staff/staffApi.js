import { apiSlice } from "../apiSlice";

export const staffApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // StaffById
        getStaffById: builder.query({
            query: (staffId) => `/${staffId}`,
            method: "GET",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        }),

        // ALl Staff
        getAllStaffs: builder.query({
            query: () => "/api/manager/getAllEmployeeInformation",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        }),

        //Get All Specialty
        getAllSpecialty: builder.query({
            query: () => "/api/specialty/getAllSpecialty",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        }),

        //DayOff
        getStaffDayOff: builder.query({
            query: () => "/api/employeeDayOff/getAllEmployeeDayOff/cai_nay_BE_test_ko_dung",
            mode: "no-cors",
            keepUnusedDataFor: 0,
        })
    })
});

export const { useGetAllStaffsQuery, useGetStaffByIdQuery, useGetAllSpecialtyQuery, useGetStaffDayOffQuery } = staffApi;


// import axios from '../axios';

// const getAllStaffs = () => {
//     return axios.get(`/getAllEmployee`);
// }

// const getStaffById = (staffId) => {
//     return axios.get(`/${staffId}`);
// }

// export {
//     getAllStaffs,
//     getStaffById
// }