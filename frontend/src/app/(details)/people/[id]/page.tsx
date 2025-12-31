import PersonDetailsPage from "@/components/PersonDetailsPage";

import { BASE_BACKEND_URL } from "@/constants";

import { Person } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${BASE_BACKEND_URL}/people/${id}`);

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center row-span-2 text-[7px] text-pinkish-grey text-center font-bold">
        Failed to fetch person details
      </div>
    );
  }

  const person: Person = await response.json();

  return <PersonDetailsPage person={person} />;
}
