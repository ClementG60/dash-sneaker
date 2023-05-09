import { configureStore } from "@reduxjs/toolkit";
import websitesReducer from "../domain/usecases/websitesSlice";
import resellWebsitesReducer from "../domain/usecases/resellWebsitesSlice";
import sneakersReducer from "../domain/usecases/sneakersSlice";
import expensivesReducer from "../domain/usecases/expensiveSlice";
import brandsReducer from "../domain/usecases/brandsSlice";
import trackingsReducer from "../domain/usecases/trackingsSlice";
import stuffsReducer from "../domain/usecases/stuffsSlice";

//configuration du store avec tous les reducers
const store = configureStore({
  reducer: {
    websites: websitesReducer,
    resellWebsites: resellWebsitesReducer,
    sneakers: sneakersReducer,
    expensives: expensivesReducer,
    brands: brandsReducer,
    trackings: trackingsReducer,
    stuffs: stuffsReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
