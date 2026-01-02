type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="grid gap-y-[2.5px]">
    <div className="grid gap-y-[5px]">
      <h2 className="text-[8px] font-bold text-black">{title}</h2>
      <hr className="border-t-[0.5px] border-t-pinkish-grey" />
    </div>

    {children}
  </div>
);

export default Section;
