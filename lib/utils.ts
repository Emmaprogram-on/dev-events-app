import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authformSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional(): z.string().min(3, "Required"),
  lastName: type === 'sign-in' ? z.string().optional(): z.string().min(3, "Required"),
  email: z
  .string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
})

export const parseStringify = (value: any) => JSON.parse
  (JSON.stringify(value));