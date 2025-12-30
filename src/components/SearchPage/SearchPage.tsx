"use client";

import { SearchProvider } from "@/src/context/SearchContext";

import Results from "./components/Results";
import SearchInput from "./components/SearchInput";

export default function SearchPage() {
  return (
    <SearchProvider>
      <div className="w-[511px] mx-auto flex gap-x-[15px] items-start">
        <SearchInput />
        <Results />
      </div>
    </SearchProvider>
  );
}
