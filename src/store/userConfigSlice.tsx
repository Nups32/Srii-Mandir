import { decryptData, encryptData } from "@/utils/Helper";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserConfig = {
    _id: number;
    email: string;
    role: number;
    photo?: string;
    username: string;
    mobile: string;
    token: string;
}

// const data = localStorage.getItem('authData');
const localStorageData = decryptData('authData')
// if(data){
//     localStorageData = decryptData('authData') || null;
// }

export const defaultUserConfigState: UserConfig = {
    token: localStorageData?.token || null,
    username: localStorageData?.user?.username || null,
    mobile: localStorageData?.user?.mobile || null,
    email: localStorageData?.user?.email || null,
    _id: localStorageData?.user?._id || null,
    role: localStorageData?.user?.role || null,
    photo: localStorageData?.user?.photo || null,
}
const initialState = defaultUserConfigState

const userConfigSlice = createSlice({
    name: 'userConfig',
    initialState: initialState,
    reducers: {
        setUserConfig: (state, { payload }: PayloadAction<UserConfig>) => {
            state.token = payload.token;
            state.email = payload.email;
            state.photo = payload.photo;
            state.username = payload.username;
            state.mobile = payload.mobile;
            state._id = payload._id;
            state.role = payload.role;
            encryptData('token', payload.token, 'string');
            encryptData('authData', {
                token: payload.token,
                user: {
                    _id: payload._id,
                    username: payload.username,
                    mobile: payload.mobile,
                    email: payload.email,
                    role: payload.role,
                    photo: payload.photo,
                }
            });
        },

        setUserClearConfig: (state) => {
            state.token = "";
            state.email = "";
            state.photo = "";
            state.username = "";
            state.mobile = "";
            state._id = NaN;
            state.role = NaN;
            localStorage.clear();
        },


    }
})

export const { setUserConfig, setUserClearConfig } = userConfigSlice.actions
export default userConfigSlice.reducer