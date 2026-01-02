import StatisticsPage from "@/components/StatisticsPage";

import { BASE_BACKEND_URL } from "@/constants";

import { Statistics } from "@/types";

export default async function Page() {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/statistics`);

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const statistics: Statistics = await response.json();

    return <StatisticsPage statistics={statistics} />;
  } catch (error) {
    return (
      <div className="flex items-center justify-center row-span-3 text-[7px] text-pinkish-grey text-center font-bold">
        {(error as Error).message}
      </div>
    );
  }
}
