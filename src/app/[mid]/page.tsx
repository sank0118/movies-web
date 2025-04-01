import { PageProps, TMDBMovieDetail, tmdbOptions } from "@/types/tmdb";
import Image from "next/image";
import MovieSlide from "./MovieSlide";

const fetchMovie = async (props: PageProps<{ mid: string }>) => {
  const { mid } = await props.params;
  const url = `https://api.themoviedb.org/3/movie/${mid}?language=en-US`;

  const res = await fetch(url, tmdbOptions());
  const data = (await res.json()) as TMDBMovieDetail;

  return data;
};

const MovieIdPage = async (props: PageProps<{ mid: string }>) => {
  const movie = await fetchMovie(props);
  return (
    <div className="flex flex-col md:flex-row ">
      <div>
        {movie.adult && <p className="text-red-500">19금</p>}
        <Image
          alt={movie.title}
          src={`${process.env.TMDB_IMG_URL}/w500${movie.backdrop_path}`}
          width={100}
          height={100}
          className="w-full"
        />
        <div className="p-5 flex flex-col gap-y-2.5">
          <div>
            <h1>
              {movie.title} <span>{movie.origin_country}</span>
            </h1>
            {movie.title !== movie.original_title && (
              <p>{movie.original_title}</p>
            )}
          </div>
          <div>
            <p>{movie.overview}</p>
          </div>
          <div>
            <p>{movie.popularity}</p>
            <p>{movie.vote_average}</p>
            <p>{movie.vote_country}</p>
          </div>
        </div>
      </div>
      <MovieSlide {...response} />
    </div>
  );
};

export default MovieIdPage;
