type BaseDetailsPageProps = {
  title: string;
  children: React.ReactNode;
};

export default function BaseDetailsPage({
  title,
  children,
}: BaseDetailsPageProps) {
  return (
    <>
      <h1 className="text-[9px] font-bold text-black">{title}</h1>

      <div className="grid grid-cols-[1fr_1fr] gap-x-[50px] items-start">
        {children}
      </div>
    </>
  );
}
