"use client";

import { SearchProvider } from "@/src/context/SearchContext";

import ResultsArea from "./components/ResultsArea";
import SearchForm from "./components/SearchForm";

export default function SearchPage() {
  return (
    <SearchProvider>
      <div className="w-[511px] mx-auto flex gap-x-[15px] items-start">
        <SearchForm />
        <ResultsArea />
      </div>
    </SearchProvider>
  );
}
