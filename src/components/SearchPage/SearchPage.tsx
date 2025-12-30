"use client";

import { SearchProvider } from "@/src/context/SearchContext";

import Results from "./components/Results";
import SearchForm from "./components/SearchForm";

export default function SearchPage() {
  return (
    <SearchProvider>
      <div className="w-[511px] mx-auto flex gap-x-[15px] items-start">
        <SearchForm />
        <Results />
      </div>
    </SearchProvider>
  );
}
