import { createSlice } from "@reduxjs/toolkit";
import { ITrackingState } from "../interface/Interface";

const initialState: ITrackingState = {
    trackings: [],
}

export const trackingsSlice = createSlice({
    name: "trackings",
    initialState,
    reducers: {
        setTrackings: (state, { payload }) => {
            state.trackings = payload
        },
        addTracking: (state, { payload }) => {
            state.trackings.push(payload)
        }
    }
});

export const { setTrackings, addTracking } = trackingsSlice.actions;
export default trackingsSlice.reducer;