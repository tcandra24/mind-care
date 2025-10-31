"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSettingStore } from "@/store/setting";
import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";

const formSchema = z.object({
  oldPassword: z.string().min(8).max(50),
  newPassword: z.string().min(8).max(50),
});

const ChangePasswordForm = () => {
  const { loading, error, changePassword } = useSettingStore();
  const { logout: logoutSession } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });

    if (error) {
      console.log(error);
      return;
    }

    toast.info("New password profile is saved");

    form.reset();

    await logoutSession();

    redirect("/login");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your old password" className="lg:w-1/2 w-full" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your new password" className="lg:w-1/2 w-full" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading ? true : false}>
                {loading ? "Loading..." : "Save password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
