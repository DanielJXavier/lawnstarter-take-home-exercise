import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[402px] min-h-[208.5px] mt-[15px] mx-auto p-[15px] grid gap-y-[15px] grid-rows-[auto_1fr_auto] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      {children}

      <Link
        className="w-fit px-4.5 py-1 border-[0.5px] border-green-teal-2 bg-green-teal-2 rounded-[8.5px] text-[7px] font-bold text-white uppercase leading-2"
        href="/"
      >
        Back to search
      </Link>
    </div>
  );
}
