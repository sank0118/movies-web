export interface TMDBResponse {
  total_pages: number;
  total_results: number;
  page: number;
  results: TMDBMovie[];
}

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PageProps<Params> {
  params: Promise<Params>;
}

export interface TMDBMovieDetail extends TMDBMovie {}

export const tmdbOptions = (method: string = "GET") => ({
  method,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
});

export interface TMDBGenre {
  id: number;
  name: string;
}
