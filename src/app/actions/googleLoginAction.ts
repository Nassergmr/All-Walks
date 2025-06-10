"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

export async function GoogleLoginAction() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "google log in failed";
    }
    throw error;
  }
}
