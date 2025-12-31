export default function BaseDetailsPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-[9px] font-bold text-black">{title}</h1>

      <div className="grid grid-cols-[1fr_1fr] gap-x-[50px] items-start">
        {children}
      </div>
    </>
  );
}
