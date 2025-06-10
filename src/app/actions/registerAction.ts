"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../../components/authComponents/schemas/registerSchema";
import { signIn } from "../../../auth";

export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }
    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation)
      return { error: "Passwords do not match" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const isUserExists = await prisma.user.findFirst({
      where: { email },
    });

    if (isUserExists) {
      return { error: "User Already Exists!" };
    }

    const emailToLowerCase = email.toLocaleLowerCase();

    const registeredUser = await prisma.user.create({
      data: {
        email: emailToLowerCase,
        password: hashedPassword,
        name,
      },
    });

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      console.error(error);
    }

    return { success: "Account created successfully!", registeredUser };
  } catch (error) {
    console.error(error);
  }
};
