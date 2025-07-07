type MiniNavbarProps = {
  activeId: string;
  setActiveId: (id: string) => void;
};

const items = ["about", "experience", "projects"];

export default function MiniNavbar({ activeId, setActiveId }: MiniNavbarProps) {
  return (
    <nav className="flex flex-col gap-6 mt-8">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActiveId(item)}
          className={`group flex items-center gap-4 text-2xl uppercase tracking-wide font-bold transition-all 
            ${activeId === item ? "text-white" : "text-slate-500 hover:text-white"}`}
        >
          <span
            className={`h-[2px] transition-all bg-white ${
              activeId === item ? "w-24" : "w-12 group-hover:w-24"
            }`}
          />
          <span>{item}</span>
        </button>
      ))}
    </nav>
  );
}
