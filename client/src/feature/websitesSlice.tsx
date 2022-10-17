import { createSlice } from "@reduxjs/toolkit";
import { IWebsiteState } from "../interface/Interface";

const initialState: IWebsiteState = {
    websites: [],
}

export const websitesSlice = createSlice({
    name: "websites",
    initialState,
    reducers: {
        setWebsites: (state, { payload }) => {
            state.websites = payload
        },
        addWebsite: (state, { payload }) => {
            state.websites.push(payload)
        }
    }
});

export const { setWebsites, addWebsite } = websitesSlice.actions;
export default websitesSlice.reducer;