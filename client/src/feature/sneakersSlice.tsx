import { createSlice } from "@reduxjs/toolkit";
import { ISneakerState } from "../interface/Interface";

const initialState: ISneakerState = {
    sneakers: [],
}

export const sneakersSlice = createSlice({
    name: "sneakers",
    initialState,
    reducers: {
        setSneakers: (state, { payload }) => {
            state.sneakers = payload
        },
        addSneaker: (state, { payload }) => {
            state.sneakers.push(payload)
        },
        deleteSneaker: (state, { payload }) => {
            state.sneakers = state.sneakers.filter((sneaker) => sneaker._id !== payload)
        }
    }
});

export const { setSneakers, addSneaker, deleteSneaker } = sneakersSlice.actions;
export default sneakersSlice.reducer;