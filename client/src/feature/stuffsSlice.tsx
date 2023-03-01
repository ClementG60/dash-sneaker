import { createSlice } from "@reduxjs/toolkit";
import { IStuffState } from "../interface/Interface";

const initialState: IStuffState = {
  stuffs: [],
};

export const stuffsSlice = createSlice({
  name: "stuffs",
  initialState,
  reducers: {
    setStuffs: (state, { payload }) => {
      state.stuffs = payload;
    },
    addStuff: (state, { payload }) => {
      state.stuffs.push(payload);
    },
    updateStuff: (state, { payload }) => {
      state.stuffs = state.stuffs.map((stuff) => {
        if (stuff._id === payload[0]) {
          return {
            stuff,
            ...payload[1],
          };
        }
      });
    },
    deleteStuff: (state, { payload }) => {
      state.stuffs = state.stuffs.filter(
        (stuff) => stuff._id !== payload
      );
    },
  },
});

export const { setStuffs, addStuff, updateStuff, deleteStuff } = stuffsSlice.actions;
export default stuffsSlice.reducer;