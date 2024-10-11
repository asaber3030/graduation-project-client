import { clsx, type ClassValue } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateArray(length: number) {
  return Array.from({ length })
}

export function extractToken(headers: string) {
  return headers.split(" ")[1]
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors
}

export function randomHexColorCode() {
  let colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-gray",
    "bg-orange-500",
  ]
  return colors[Math.floor(Math.random() * 6)]
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format)
}
