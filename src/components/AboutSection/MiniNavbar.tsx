type MiniNavbarProps = {
  activeId: string;
  setActiveId: (id: string) => void;
};

const items = ["bio", "education", "experience"];

export default function MiniNavbar({ activeId, setActiveId }: MiniNavbarProps) {
  return (
    <nav className="flex flex-col gap-6 mt-8">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => {
            setActiveId(item);
            const section = document.getElementById(item);
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
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
