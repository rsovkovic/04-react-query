import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

// import axios from "axios";

export default function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isSuccess]);
  const totalPages = data?.total_pages ?? 0;
  const handleSearch = async (topic: string) => {
    setSearchQuery(topic);
    setCurrentPage(1);
    // setIsLoading(true);
    // setIsError(false);
    // try {
    // const results = await fetchMovies(topic, 1);
    // if ( data?.results.length === 0) {
    //   toast.error("No movies found for your request.");
    // }

    //   setMovies(results);
    // } catch {
    //   setIsError(true);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleSelect} />
      )}
      {/* {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )} */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
