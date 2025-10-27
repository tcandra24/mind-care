"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/auth";

const formSchema = z.object({
  mood: z.string().min(1),
  note: z.string().min(25).max(250),
});

export default function CreateMood() {
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/tip", {
      method: "POST",
      body: JSON.stringify({
        mood: values.mood,
        note: values.note,
        user_id: user.id,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create of Moods</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, fuga? Ea sunt molestias in, sed quod sapiente minus deleniti laborum.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mood</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Enter Mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="sad">Sad</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="angry">Angry</SelectItem>
                            <SelectItem value="anxious">Anxious</SelectItem>
                            <SelectItem value="excited">Excited</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter Note" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
