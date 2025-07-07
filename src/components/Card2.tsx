type Card2Props = {
  title: string;
};

export default function Card2({ title }: Card2Props) {
  return (
    <div className="relative w-[190px] h-[254px] bg-[#07182E] flex items-center justify-center overflow-hidden rounded-[20px] card-glow">
      <h2 className="z-10 text-white text-2xl">{title}</h2>
    </div>
  );
}