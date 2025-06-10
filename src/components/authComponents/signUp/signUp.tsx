"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Components
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";
import { RegisterAction } from "../../../app/actions/registerAction";
import GoogleForm from "../signIn/googleForm";

// Shadcn Ui
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const SignUp: React.FC = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRouter();
  const { update } = useSession();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
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

  const handleSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const res = await RegisterAction(data);

    if (res?.error) {
      setError(res?.error);
      setSuccess("");
      setLoading(false);
    } else if (res?.success) {
      setSuccess(res?.success);
      setError("");
      setLoading(false);
      await update();
      route.push("/");
    }
  };

  return (
    <div className="grid sm:min-h-[100vh] lg:grid-cols-2 grid-cols-1 items-center justify-between bg-gray-100">
      <div id="img_container" className="hidden lg:block">
        <Image
          src={"/images/icons/sign_up.svg"}
          width={550}
          height={550}
          alt=""
        />
      </div>

      {/* Form */}
      <div id="form" className=" w-full items-center justify-center">
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
              Sign up to your account
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mb-0 flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jhon Doe" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Your Password</FormLabel>
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
                  className="w-full"
                  variant={"outline"}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Sign up"}
                </Button>
              </form>
              <div className="flex gap-5 justify-between items-center py-5 m-0">
                <hr className="w-full" />
                <p className="font-bold text-center ">Or</p>
                <hr className="w-full" />
              </div>

              <GoogleForm />

              <Link href={"/sign-in"} className=" ">
                <span id="login" className="relative">
                  Already have an account?
                </span>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
