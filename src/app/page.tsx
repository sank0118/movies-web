import { TMDBMovie, TMDBResponse } from "@/types/tmdb";
import MoviItem from "./MoviItem";

const fetchMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

const Home = async () => {
  const movies = await fetchMovies();

  return (
    <div>
      <div>
        <h1>{movies.results.length}개의 영화가 있습니다.</h1>
        <p>{movies.page}번째 페이지입니다.</p>
        <p>tmdb에는 {movies.total}개의 영화가 있습니다.</p>
      </div>
      <ul className="grid grid-cols-2 gap-5 px-5">
        {movies.results.map((movie) => (
          <li key={movie.title}>
            <MoviItem {...movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
