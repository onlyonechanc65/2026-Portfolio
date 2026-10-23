"use client";

import { useEffect, useState } from "react";

export function LiveTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    // Re-check every 15s so the minute flips close to on time
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time
      suppressHydrationWarning
      style={{ fontSize: 12, fontWeight: 500, fontVariantNumeric: "tabular-nums", minWidth: 52, display: "inline-block" }}
    >
      {time ?? " "}
    </time>
  );
}
