import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// implemented for breadcrumbs
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
