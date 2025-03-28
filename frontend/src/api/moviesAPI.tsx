import axios from "axios";

const BASE_URL = import.meta.env.VITE_IMDB_BASE_API;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getMovies`);
    const data = response.data.data;

    // const movieDetailList = await Promise.all(
    //   data.map(async (item: any) => {
    //     const details = await axios.get(
    //       `${BASE_URL}?i=${item.imdbID}&plot=short&${API_KEY}`
    //     );
    //     return details.data;
    //   })
    // );
    console.log(data);
    return data;
  } catch (error) {
    console.log("failed to fetch the movie list", error);
  }
};

export const fetchTrendingMovie = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?s=action&${API_KEY}`);
    const data = response.data.Search;
    console.log(data);
    return data;
  } catch (error) {
    console.log("failed to fetch trending movies", error);
  }
};
