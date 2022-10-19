import { createSlice } from "@reduxjs/toolkit";
import { IExpensive, IExpensiveState } from "../interface/Interface";

const initialState: IExpensiveState = {
  expensives: [],
};

export const expensivesSlice = createSlice({
  name: "expensives",
  initialState,
  reducers: {
    setExpensives: (state, { payload }) => {
      state.expensives = payload;
    },
    addExpensive: (state, { payload }) => {
      state.expensives.push(payload);
    },
  },
});

export const { setExpensives, addExpensive } = expensivesSlice.actions;
export default expensivesSlice.reducer;
