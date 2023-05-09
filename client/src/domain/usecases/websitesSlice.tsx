import { createSlice } from "@reduxjs/toolkit";
import { IWebsiteState } from "../entities/Interface";

const initialState: IWebsiteState = {
  websites: [],
};

export const websitesSlice = createSlice({
  name: "websites",
  initialState,
  reducers: {
    setWebsites: (state, { payload }) => {
      state.websites = payload;
    },
    addWebsite: (state, { payload }) => {
      state.websites.push(payload);
    },
    deleteWebsite: (state, { payload }) => {
      state.websites = state.websites.filter(
        (website) => website._id !== payload
      );
    },
  },
});

export const { setWebsites, addWebsite, deleteWebsite } = websitesSlice.actions;
export default websitesSlice.reducer;
