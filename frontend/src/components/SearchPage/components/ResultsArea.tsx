import ResultsContent from "./ResultsContent";

const ResultsArea = () => (
  <div className="w-[291px] min-h-[291px] mt-[15px] p-[15px] grid gap-y-[5px] grid-rows-[auto_auto_1fr] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
    <p className="text-[9px] font-bold">Results</p>

    <hr className="border-t-[0.5px] border-t-pinkish-grey" />

    <ResultsContent />
  </div>
);

export default ResultsArea;
