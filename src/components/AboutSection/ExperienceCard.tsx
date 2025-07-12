import React, { useState } from "react";

type ExperienceCardProps = {
  from: string;
  to: string;
  job_title: string;
  job_desc: string;
  tags: string[];
};

type ExperienceGroupProps = {
  cards: ExperienceCardProps[];
};

export const ExperienceGroup: React.FC<ExperienceGroupProps> = ({ cards }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {cards.map((card, i) => {
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
              {card.job_title}
            </div>
            <ul className="list-disc list-outside pl-6 text-text text-md leading-relaxed mt-2 space-y-2">
                {card.job_desc.split('\n').map((line, idx) => (
                  <li key={idx} className="text-indent-[-1.5rem] ml-[1.5rem]">
                    {line}
                  </li>
                ))}
              </ul>
            <div className="flex flex-wrap gap-2 pt-4">
              {card.tags.map((tag, j) => (
                <span
                  key={j}
                  className="bg-accent bg-opacity-20 text-text-secondary text-xs font-semibold px-3 py-1 rounded-full"
                > 
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
