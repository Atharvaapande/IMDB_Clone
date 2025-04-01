import axios from "axios";

const BASE_URL = https://imdb-c4qi.onrender.com/api/movies;

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getMovies`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("failed to fetch the movie list", error);
  }
};

export const fetchMovieById = async (movieID: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/getMovieByID/${movieID}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("failed to fetch the movie list", error);
  }
};

export const updateMovieById = async (
  movieID: string | undefined,
  formData: object
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateMovie/${movieID}`,
      formData
    );
    console.log("edit", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("failed to update movie", error);
  }
};

export const createMovie = async (formData: object) => {
  // /createNewMovie
  try {
    const response = await axios.post(`${BASE_URL}/createNewMovie`, formData);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("failed to update movie", error);
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
