"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldGroup, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

import { toast } from "sonner";

import BannerImg from "@/public/banner.svg";
import IconPng from "@/public/icon.png";

import { redirect } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";

const formSchema = z.object({
  email: z.string().min(2).email().max(50),
  name: z.string().min(8).max(50),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z.string().min(8).max(50),
});

const RegisterForm = () => {
  const { error, loading, register } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await register({ email: values.email, name: values.name, phone: values.phone, password: values.password });

    if (error) {
      toast.error(error);
      return;
    }

    toast.info("Register Successfull");

    redirect("/auth/sign-in");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <Image src={IconPng} alt="logo-mind-care" width={40} height={40} />
              <h1 className="text-2xl font-bold">Get ready to join community</h1>
              <p className="text-muted-foreground text-balance">Register to your Mind Care account</p>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name address" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter phone number" {...field} />
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
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                  </div>

                  <FormControl>
                    <Input placeholder="Enter email address" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading ? true : false}>
              {loading ? "Loading..." : "Submit"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account? <Link href={"/auth/sign-in"}>Sign in</Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </Form>
      <div className="bg-muted hidden md:block">
        <Image src={BannerImg} width={300} height={300} alt="Sign Up Page" className="w-full mt-16 p-3 object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </>
  );
};

export default RegisterForm;
