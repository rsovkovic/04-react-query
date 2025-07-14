import axios from "axios";

import { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  topic: string,
  page: number
): Promise<MoviesHttpResponse> => {
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: topic, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
