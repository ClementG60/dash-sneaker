import { createSlice } from "@reduxjs/toolkit";
import { IExpensiveState } from "../interface/Interface";

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
    deleteExpensive: (state, { payload }) => {
      state.expensives = state.expensives.filter(
        (expensive) => expensive._id !== payload
      );
    },
  },
});

export const { setExpensives, addExpensive, deleteExpensive } = expensivesSlice.actions;
export default expensivesSlice.reducer;
