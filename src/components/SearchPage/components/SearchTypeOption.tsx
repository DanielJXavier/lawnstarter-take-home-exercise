import { SearchType, useSearchContext } from "@/src/context/SearchContext";

export default function SearchTypeOption({ option }: { option: SearchType }) {
  const { searchType, setSearchType } = useSearchContext();

  return (
    <div className="flex items-center gap-x-[5px]">
      <input
        className="appearance-none outline-none cursor-pointer checked:cursor-default size-2 flex items-center justify-center border-[0.5px] border-pinkish-grey rounded-full before:content-[''] before:size-0.5 before:bg-white before:rounded-full checked:border-[3px] checked:border-emerald-2"
        type="radio"
        name={option}
        id={option}
        checked={searchType === option}
        onChange={() => setSearchType(option)}
      />
      <label className="text-[7px] font-bold text-black" htmlFor={option}>
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </label>
    </div>
  );
}
