import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// implemented for breadcrumbs
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
}

// previous hydration error due to client/server mismatch
// solution: Deterministic formatter: fixed locale + timezone
// class constructor
export const fmt = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});