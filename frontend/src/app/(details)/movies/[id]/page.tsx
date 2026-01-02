import MovieDetailsPage from "@/components/MovieDetailsPage";

import { SERVER_BACKEND_URL } from "@/constants";

import { Movie } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await fetch(`${SERVER_BACKEND_URL}/movies/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const movie: Movie = await response.json();

    return <MovieDetailsPage movie={movie} />;
  } catch (error) {
    return (
      <div className="flex items-center justify-center row-span-2 text-[7px] text-pinkish-grey text-center font-bold">
        {(error as Error).message}
      </div>
    );
  }
}
