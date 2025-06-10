"use server";

import * as z from "zod";
import { signIn } from "../../../auth";
import { LoginSchema } from "@/components/authComponents/schemas/loginSchema";
import { AuthError } from "next-auth";

export const LoginAction = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validatedData = LoginSchema.parse(data);
    if (!validatedData) return { error: "Invalid input data" };

    const { email, password } = validatedData;

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return { success: "Logged in successfully!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid email or password." };
          default:
            return { error: "Something went wrong!" };
        }
      }
      throw error;
    }
  } catch {
    return { error: "Something went wrong!" };
  }
};
