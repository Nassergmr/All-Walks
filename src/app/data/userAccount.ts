import { prisma } from "../../lib/prisma";
export const getAccountByUserId = async (userId: string) => {
  try {
    const userAccount = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });
    return userAccount;
  } catch {
    return { error: "Something went wrong" };
  }
};
