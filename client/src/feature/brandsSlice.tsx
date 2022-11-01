import { createSlice } from "@reduxjs/toolkit";
import { IBrandState } from "../interface/Interface";

const initialState: IBrandState = {
    brands: [],
}

export const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setBrands: (state, { payload }) => {
            state.brands = payload
        },
        addBrand: (state, { payload }) => {
            state.brands.push(payload)
        }
    }
});

export const { setBrands, addBrand } = brandsSlice.actions;
export default brandsSlice.reducer;