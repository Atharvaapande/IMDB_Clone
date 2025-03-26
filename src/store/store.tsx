import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice"; // Import your slice

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
