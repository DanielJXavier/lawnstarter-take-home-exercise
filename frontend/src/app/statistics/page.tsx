import StatisticsPage from "@/components/StatisticsPage";

import { SERVER_BACKEND_URL } from "@/constants";

import { Statistics } from "@/types";

export default async function Page() {
  try {
    const response = await fetch(`${SERVER_BACKEND_URL}/statistics`, {
      cache: "no-store",
    });

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
