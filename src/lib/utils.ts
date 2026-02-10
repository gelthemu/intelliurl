import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidURL(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) return false;
  try {
    const url = new URL(trimmed);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function isValidHeadline(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const trimmed = input.trim();
  if (trimmed.length < 8) return false;
  if (trimmed.length > 200) return false;
  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  // Must have at least 2 words
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  // No excessive character repeats (same char 6+ times in a row)
  if (/(.)\1{5,}/.test(trimmed)) return false;
  return true;
}
