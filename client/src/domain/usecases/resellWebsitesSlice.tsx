import { createSlice } from "@reduxjs/toolkit";
import { IWebsiteState } from "../entities/Interface";

const initialState: IWebsiteState = {
  websites: [],
};

export const resellWebsites = createSlice({
  name: "resellWebsites",
  initialState,
  reducers: {
    setResellWebsites: (state, { payload }) => {
      state.websites = payload;
    },
    addResellWebsite: (state, { payload }) => {
      state.websites.push(payload);
    },
    deleteResellWebsite: (state, { payload }) => {
      state.websites = state.websites.filter(
        (website) => website._id !== payload
      );
    },
  },
});

export const { setResellWebsites, addResellWebsite, deleteResellWebsite } = resellWebsites.actions;
export default resellWebsites.reducer;
