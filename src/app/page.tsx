import Results from "../components/Results";
import Search from "../components/Search";

export default function Home() {
  return (
    <div className="w-[511px] mx-auto flex gap-x-[15px] items-start">
      <Search />
      <Results />
    </div>
  );
}
