import { Statistics } from "@/types";

import BaseDetailsPage from "./BaseDetailsPage";
import Section from "./Section";

type StatisticsPageProps = {
  statistics: Statistics;
};

const StatisticsPage = ({ statistics }: StatisticsPageProps) => (
  <BaseDetailsPage title="Statistics">
    <Section title="Total Queries">
      <p className="text-[7px] leading-tight text-black whitespace-pre-wrap">
        {statistics.totalQueries}
      </p>
    </Section>

    <Section title="Top 5 Search Queries">
      <ul className="text-[7px] leading-tight">
        {statistics.topQueries.map((query, index) => (
          <li
            key={query.term}
            className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2"
          >
            <span className="font-bold">#{index + 1}</span>
            <span>&quot;{query.term}&quot;</span>
            <span>{query.count}</span>
            <span className="min-w-[24px] text-right">
              {query.percentage.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Average Response Time">
      <ul className="text-[7px] leading-tight">
        {statistics.averageResponseTime.toFixed(2)} ms
      </ul>
    </Section>

    <Section title="Top 5 Popular Hours">
      <ul className="text-[7px] leading-tight">
        {statistics.popularHours.map((hour, index) => (
          <li
            key={hour.hour}
            className="grid grid-cols-[auto_1fr_auto_auto] gap-x-2"
          >
            <span className="font-bold">#{index + 1}</span>
            <span>
              {hour.hour > 12 ? hour.hour - 12 : hour.hour}{" "}
              {hour.hour >= 12 ? "PM" : "AM"}
            </span>
            <span>{hour.count}</span>
            <span className="min-w-[24px] text-right">
              {hour.percentage.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Search Type Breakdown">
      <p className="text-[7px] leading-tight text-black whitespace-pre-wrap grid">
        <span>People: {statistics.searchTypeBreakdown.people}</span>
        <span>Movies: {statistics.searchTypeBreakdown.movies}</span>
      </p>
    </Section>

    <span className="text-[6px]">
      (Next update in{" "}
      {Math.floor(
        (new Date(statistics.nextUpdate).getTime() - new Date().getTime()) /
          1000
      )}{" "}
      seconds)
    </span>
  </BaseDetailsPage>
);

export default StatisticsPage;
