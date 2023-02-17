import { createSlice } from "@reduxjs/toolkit";
import { IStuffState } from "../interface/Interface";

const initialState: IStuffState = {
  stuffs: [],
};

export const stuffsSlice = createSlice({
  name: "expensives",
  initialState,
  reducers: {
    setStuffs: (state, { payload }) => {
      state.stuffs = payload;
    },
    addStuff: (state, { payload }) => {
      state.stuffs.push(payload);
    },
    deleteStuff: (state, { payload }) => {
      state.stuffs = state.stuffs.filter(
        (stuff) => stuff._id !== payload
      );
    },
  },
});

export const { setStuffs, addStuff, deleteStuff } = stuffsSlice.actions;
export default stuffsSlice.reducer;