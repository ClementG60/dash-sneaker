import { createSlice } from "@reduxjs/toolkit";
import { IWebsiteState } from "../interface/Interface";

const initialState: IWebsiteState = {
    websites: [],
}

export const resellWebsites = createSlice({
    name: "resellWebsites",
    initialState,
    reducers: {
        setResellWebsites: (state, { payload }) => {
            state.websites = payload
        },
        addResellWebsite: (state, { payload }) => {
            state.websites.push(payload)
        }
    }
});

export const { setResellWebsites, addResellWebsite } = resellWebsites.actions;
export default resellWebsites.reducer;