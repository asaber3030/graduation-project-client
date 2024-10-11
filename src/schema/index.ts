import { usernameRegEx, phoneNumberRegEx } from "@/lib/regex"
import { z } from "zod"

export const GlobalLoginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  hospitalId: z.number({ message: "Hospital is required" }),
})

export const UserSchema = {
  register: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  }),

  login: z.object({
    phone: z.string().min(1, { message: "Phone number is required" }),
    password: z.string().min(1, { message: "Password is required!" }),
  }),

  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" })
      .optional(),
  }),

  changePassword: z
    .object({
      currentPassword: z.string().min(1, { message: "Current Password is required" }),
      newPassword: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
      confirmationPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmationPassword, {
      message: "Passwords don't match",
      path: ["confirmationPassword"],
    }),
}

export const AdminSchema = {
  register: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  }),

  update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" })
      .optional(),
  }),

  login: z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required!" }),
  }),
}

export const AddressSchema = {
  create: z.object({
    streetName: z
      .string()
      .max(50, { message: "Street name cannot be more than 50 characters" })
      .min(1, { message: "Street name cannot be empty" }),
    homeNumber: z
      .string()
      .max(50, { message: "Home Number cannot be more than 50 characters" })
      .min(1, { message: "Home Number cannot be empty" }),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" }),
    notes: z.string().max(50, { message: "" }),
  }),

  update: z.object({
    streetName: z
      .string()
      .max(50, { message: "Street name cannot be more than 50 characters" })
      .min(1, { message: "Street name cannot be empty" })
      .optional(),
    homeNumber: z
      .string()
      .max(50, { message: "Home Number cannot be more than 50 characters" })
      .min(1, { message: "Home Number cannot be empty" })
      .optional(),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegEx, { message: "Invalid Phone Number" })
      .min(1, { message: "Phone Number is required" })
      .regex(usernameRegEx, { message: "Invalid Egyptian Phone Number" })
      .optional(),
    notes: z.string().max(50, { message: "Notes cannot be more than 50 characters" }).optional(),
  }),
}
