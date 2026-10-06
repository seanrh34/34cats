"use client";

import { useEffect, useState } from "react";

/** Live Singapore time; fills in after mount to avoid hydration mismatch. */
export function Clock({ className, seconds = true }: { className?: string; seconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      minute: "2-digit",
      ...(seconds ? { second: "2-digit" } : {}),
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  );
}
