import { moodColors } from "@/constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMoodColor = (mood: string) => {
  return moodColors[mood as keyof typeof moodColors];
};

export const ucwords = (str: string): string => {
  return String(str)
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
};
