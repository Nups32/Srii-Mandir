/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const parsedSetting = (() => {
  try {
    const s = localStorage.getItem('setting');
    return s && s !== "undefined" && s !== "null" ? JSON.parse(s) : {};
  } catch {
    return {};
  }
})();

const initialState = {
    email: parsedSetting.email || "",
    headOffice: parsedSetting.headOffice || "",
    branchOffice: parsedSetting.branchOffice || "",
    image: parsedSetting.image || "",
};

const setingConfigSlice = createSlice({
    name: 'setting',
    initialState: initialState,
    reducers: {
        setAllSetting(_state: any, { payload }: any) {
            localStorage.setItem('setting', JSON.stringify(payload));
            return payload;
        },
        setSetting(state: any, { payload }: any) {
            state[payload.type] = payload.data;
            localStorage.setItem('setting', JSON.stringify(state));
        },
    },
});

export const { setSetting, setAllSetting } = setingConfigSlice.actions;

export default setingConfigSlice.reducer;
