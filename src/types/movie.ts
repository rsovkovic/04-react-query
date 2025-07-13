// export type VoteType = "good" | "neutral" | "bad";

// export interface Votes {
//   good: number;
//   neutral: number;
//   bad: number;
// }
export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
export interface MoviesHttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
