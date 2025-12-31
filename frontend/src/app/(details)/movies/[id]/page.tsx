import MovieDetailsPage from "@/components/MovieDetailsPage";

import { BASE_BACKEND_URL } from "@/constants";

import { Movie } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${BASE_BACKEND_URL}/movies/${id}`);

  if (!response.ok) {
    return <div>Failed to fetch movie details</div>;
  }

  const movie: Movie = await response.json();

  return <MovieDetailsPage movie={movie} />;
}
