import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classNames safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Delay helper (useful for animations)
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
