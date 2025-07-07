import { useEffect, useState } from "react";

export default function CursorAura() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
      }}
    >
      <div className="w-[500px] h-[500px] rounded-full bg-accent opacity-10 blur-3xl" />
    </div>
  );
}
