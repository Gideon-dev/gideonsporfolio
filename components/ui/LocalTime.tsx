"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};

type Props = { timeZone: string; label: string; prefix?: string };

// Shows the owner's current local time. Renders nothing on the server so the
// markup never mismatches during hydration.
const LocalTime = ({ timeZone, label, prefix = "Local time" }: Props) => {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(
        new Date(),
      ),
    () => null,
  );

  return (
    <span className="tabular-nums">
      {prefix && `${prefix} `}
      <time>{time ?? "--:--"}</time> {label}
    </span>
  );
};

export default LocalTime;
