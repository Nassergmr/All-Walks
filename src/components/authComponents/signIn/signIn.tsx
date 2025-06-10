"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

// Components
import { toast } from "react-toastify";
import { LoginSchema } from "../schemas/loginSchema";
import { LoginAction } from "@/app/actions/loginAction";
import GoogleForm from "./googleForm";

// Shadcn Ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignIn: React.FC = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRouter();
  const { update } = useSession();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);

    try {
      const res = await LoginAction(data);

      if (res?.error) {
        setError(res?.error);
        setSuccess("");
        setLoading(false);
      }
      if (res?.success) {
        await update();
        setSuccess(res?.success);
        setError("");
        setLoading(false);

        route.refresh();
        route.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid sm:min-h-[100vh] h-[100dvh] lg:grid-cols-2 grid-cols-1 items-center justify-between bg-gray-100">
      <div id="img_container" className="hidden lg:block">
        <Image
          src={"/images/icons/sign_in.svg"}
          width={550}
          height={550}
          alt=""
        />
      </div>

      {/* Form */}
      <div id="form" className="w-full">
        <div className="lg:w-[60%] sm:w-[50%] w-[80%] mx-auto xl:ml-0 bg-white rounded-lg shadow  xl:p-0">
          <div className="p-6 space-y-4">
            <Link href="/" className="w-fit block mx-auto mb-6">
              <Image
                src="/images/logo/allwalks.svg"
                alt="logo"
                width={100}
                height={100}
                className="mb-5"
              />
            </Link>

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mb-0 flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Your Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john-doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Your Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="****************"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={loading}
                  size={"lg"}
                  className="w-full mt-5"
                  variant={"outline"}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </Button>
              </form>
              <div className="flex gap-5 justify-between items-center py-5 m-0">
                <hr className="w-full" />
                <p className="font-bold text-center ">Or</p>
                <hr className="w-full" />
              </div>
              <GoogleForm />
              <Link href={"/sign-up"} className="">
                <span id="login" className="relative">
                  Don’t have an account?
                </span>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
