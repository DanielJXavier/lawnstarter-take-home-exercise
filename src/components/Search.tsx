export default function Search() {
  return (
    <div className="w-[205px] mt-[15px] p-[15px] grid gap-y-2.5 bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      <p className="text-[7px] font-semibold">What are you searching for?</p>

      <div className="flex gap-x-[15px]">
        <div className="flex items-center gap-x-[5px]">
          <input
            className="appearance-none size-2 flex items-center justify-center border-[0.5px] border-pinkish-grey rounded-full before:content-[''] before:size-0.5 before:bg-white before:rounded-full checked:border-[3px] checked:border-emerald-2"
            type="radio"
            name="search-type"
            id="people"
            value="people"
            checked
            readOnly
          />
          <label className="text-[7px] font-bold text-black" htmlFor="people">
            People
          </label>
        </div>

        <div className="flex items-center gap-x-[5px]">
          <input
            className="appearance-none size-2 flex items-center justify-center border-[0.5px] border-pinkish-grey rounded-full before:content-[''] before:size-0.5 before:bg-white before:rounded-full checked:border-[3px] checked:border-emerald-2"
            type="radio"
            name="search-type"
            id="movies"
            value="movies"
          />
          <label className="text-[7px] font-bold text-black" htmlFor="movies">
            Movies
          </label>
        </div>
      </div>

      <input
        className="px-[5px] py-1.5 rounded-xs border-[0.5px] border-green-teal shadow-[inset_0_0.5px_1.5px_0_var(--color-warm-grey-75)] text-[7px] font-bold placeholder-pinkish-grey outline-none"
        type="text"
        placeholder="e.g. Chewbacca, Yoda, Boba Fett"
      />

      <button className="py-1 rounded-[10px] border-[0.5px] border-pinkish-grey bg-pinkish-grey text-white font-bold text-[7px] uppercase">
        Search
      </button>
    </div>
  );
}
