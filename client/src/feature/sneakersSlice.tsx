import { createSlice } from "@reduxjs/toolkit";
import { ISneakerState } from "../interface/Interface";

const initialState: ISneakerState = {
  sneakers: [],
};

export const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {
    setSneakers: (state, { payload }) => {
      state.sneakers = payload;
    },
    setSneakerById: (state, { payload }) => {
      state.sneakers = payload;
    },
    addSneaker: (state, { payload }) => {
      state.sneakers.push(payload);
    },
    updateSneaker: (state, { payload }) => {
      state.sneakers = state.sneakers.map((sneaker) => {
        if (sneaker._id === payload[0]) {
          return {
            sneaker,
            ...payload[1],
          };
        }
      });
    },
    deleteSneaker: (state, { payload }) => {
      state.sneakers = state.sneakers.filter(
        (sneaker) => sneaker._id !== payload
      );
    },
  },
});

export const { setSneakers, addSneaker, deleteSneaker, updateSneaker } =
  sneakersSlice.actions;
export default sneakersSlice.reducer;
