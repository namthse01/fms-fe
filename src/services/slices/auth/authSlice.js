import { createSlice } from "@reduxjs/toolkit";

const initState = {
    username: null,
    token: null,
    rememberMe: JSON.parse(localStorage.getItem("rememberMe")) || false,
    profile: {
        name: "",
        phonenum: "",
    },
    role: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, accessToken, userLoginBasicInformationDto } = action.payload;
            console.log("Data:", userLoginBasicInformationDto.roleName);
            return { ...state, username: username, token: accessToken, role: userLoginBasicInformationDto.roleName };
        },

        setRememberMe: (state, action) => {
            const { rememberMe } = action.payload;
            return { ...state, rememberMe: rememberMe };
        },
        setProfile: (state, action) => {
            console.log("Action", action.payload);
            return { ...state, profile: { ...action.payload } };
        },
    },

});

export const { setCredentials, setRememberMe, setProfile } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRememberMe = (state) => state.auth.rememberMe;
export const selectCurrentProfile = (state) => state.auth.profile;
export const selectCurrentRole = (state) => state.auth.role;
