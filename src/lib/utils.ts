// [AI_START TIMESTAMP=2025-06-15 12:00:00]
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// [AI_END LINES=7 TIMESTAMP=2025-06-15 12:00:00]
