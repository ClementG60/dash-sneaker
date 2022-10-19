import { configureStore } from "@reduxjs/toolkit";
import websitesReducer from "../feature/websitesSlice";
import resellWebsitesReducer from "../feature/resellWebsitesSlice";
import sneakersReducer from "../feature/sneakersSlice";
import expensivesReducer from "../feature/expensiveSlice";

const store = configureStore({
    reducer: {
        websites: websitesReducer,
        resellWebsites: resellWebsitesReducer,
        sneakers: sneakersReducer,
        expensives: expensivesReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;