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
        },
        deleteBrand: (state, { payload }) => {
            state.brands = state.brands.filter(
              (brand) => brand._id !== payload
            );
          },
    }
});

export const { setBrands, addBrand, deleteBrand } = brandsSlice.actions;
export default brandsSlice.reducer;