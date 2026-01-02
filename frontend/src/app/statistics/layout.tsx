import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-[402px] min-h-[208.5px] mt-[15px] mx-auto p-[15px] grid gap-y-[15px] grid-rows-[auto_1fr_auto] bg-white rounded-xs border-[0.5px] border-green-teal shadow-[0_0.5px_1px_0_var(--color-warm-grey-75)]">
      {children}
    </div>
  );
}
