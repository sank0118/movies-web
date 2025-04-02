"use client";

import useObserver from "@/hooks/useObserver";
import { TMDBMovie, tmdbOptions, TMDBResponse } from "@/types/tmdb";
import MovieItem from "./MovieItem";
import { useCallback, useEffect, useState } from "react";

const ReadMore = (movies: TMDBResponse) => {
  const { Wrapper, isInView } = useObserver();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [totoalMovies, setTotoalMovies] = useState<TMDBMovie[]>(movies.results);
  const [fetchedMovies, setFetchedMovies] = useState<TMDBMovie[]>([]);

  const fetchMovies = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

      const res = await fetch(url, tmdbOptions());
      const data = (await res.json()) as TMDBResponse;

      setFetchedMovies(data.results);
      setPage((prev) => prev + 1);
    } catch (error: any) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInView && !isLoading && page < movies.total_pages) {
      fetchMovies(page + 1);
    }
  }, [isLoading, isInView, movies.total_pages, page, fetchMovies]);

  useEffect(() => {
    console.log({ page, fetchedMovies, totoalMovies });
  }, [page, fetchedMovies, totoalMovies]);

  useEffect(() => {
    if (!isLoading && fetchedMovies.length > 0) {
      setTimeout(() => {
        setTotoalMovies((prev) => [...prev, ...fetchedMovies]);
        setFetchedMovies([]);
      }, 1000);
    }
  }, [fetchedMovies, isLoading]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-5 px-5 sm:grid-cols-3 md:grid-cols-4 max-w-300 mx-auto">
        {totoalMovies.map((movie) => (
          <li key={movie.title}>
            <MovieItem {...movie} />
          </li>
        ))}
        {/* {fetchedMovies.length >0 && fetchMovies.length >0} */}
      </ul>
      return <Wrapper>{isLoading ? "loading..." : "Read More"}</Wrapper>;
    </>
  );
};

export default ReadMore;
