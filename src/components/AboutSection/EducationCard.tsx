import React, { useState } from "react";

type EducationCardProps = {
  from: string;
  to: string;
  ed_title: string;
  ed_desc: string;
};

type EducationGroupProps = {
  expCards: EducationCardProps[];
};

export const EducationGroup: React.FC<EducationGroupProps> = ({ expCards }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {expCards.map((card, i) => {
        const isHovered = hoveredIndex !== null;
        const isThis = hoveredIndex === i;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative p-6 md:p-8 rounded-xl shadow-lg border transition-all duration-300
              ${
                isHovered
                  ? isThis
                    ? "opacity-100 scale-[1.02] border-slate-500 bg-secondary"
                    : "opacity-40"
                  : "opacity-100"
              }
              bg-gradient-to-b from-background to-secondary/70 border-[#1e293b]
            `}
          >
            <div className="text-md text-text font-medium">{card.from} — {card.to}</div>
            <div className="text-lg md:text-xl font-bold text-text group-hover:text-primary transition-colors duration-300 mt-2">
              {card.ed_title}
            </div>
            <div className="text-text text-md leading-relaxed mt-2">
              <ul className="list-disc list-outside pl-6 text-text text-md leading-relaxed mt-2 space-y-2">
                {card.ed_desc.split('\n').map((line, idx) => (
                  <li key={idx} className="text-indent-[-1.5rem] ml-[1.5rem]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
