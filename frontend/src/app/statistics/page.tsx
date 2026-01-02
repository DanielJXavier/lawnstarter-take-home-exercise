import StatisticsPage from "@/components/StatisticsPage";

import { BASE_BACKEND_URL } from "@/constants";

import { Statistics } from "@/types";

export default async function Page() {
  const response = await fetch(`${BASE_BACKEND_URL}/statistics`);

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center row-span-2 text-[7px] text-pinkish-grey text-center font-bold">
        Failed to fetch statistics
      </div>
    );
  }

  const statistics: Statistics = await response.json();

  return <StatisticsPage statistics={statistics} />;
}
