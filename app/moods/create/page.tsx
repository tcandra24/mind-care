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

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAuthStore } from "@/store/auth";
import { useMemoStore } from "@/store/memo";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import angry from "@/constant/angry.json";
import anxious from "@/constant/anxious.json";
import excited from "@/constant/excited.json";
import happy from "@/constant/happy.json";
import neutral from "@/constant/neutral.json";
import sad from "@/constant/sad.json";

import { quotes } from "@/constant";

const formSchema = z.object({
  mood: z.string().min(1),
  note: z.string().min(25).max(250),
});

export default function CreateMood() {
  const [letter, setLetter] = useState<string>("");
  const { user } = useAuthStore();
  const { loading, store } = useMemoStore();

  const iconAngryRef = useRef<LottieRefCurrentProps>(null);
  const iconAnxiousRef = useRef<LottieRefCurrentProps>(null);
  const iconExcitedRef = useRef<LottieRefCurrentProps>(null);
  const iconHappyRef = useRef<LottieRefCurrentProps>(null);
  const iconNeutralRef = useRef<LottieRefCurrentProps>(null);
  const iconSadRef = useRef<LottieRefCurrentProps>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await store({
      mood: values.mood,
      note: values.note,
      user_id: user.id,
    });

    form.reset();

    redirect("/moods");
  };

  useEffect(() => {
    setLetter(quotes[Math.floor(Math.random() * quotes.length)].text);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-1 gap-4 p-4 pt-0 w-full">
        <Card className="lg:w-3/5 w-full">
          <CardHeader>
            <CardTitle>Create of Moods</CardTitle>
            <CardDescription>How do you feels today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex gap-7">
              <Lottie lottieRef={iconAngryRef} animationData={angry} autoplay={false} onMouseEnter={() => iconAngryRef.current?.play()} onMouseLeave={() => iconAngryRef.current?.stop()}></Lottie>
              <Lottie lottieRef={iconAnxiousRef} animationData={anxious} autoplay={false} onMouseEnter={() => iconAnxiousRef.current?.play()} onMouseLeave={() => iconAnxiousRef.current?.stop()}></Lottie>
              <Lottie lottieRef={iconExcitedRef} animationData={excited} autoplay={false} onMouseEnter={() => iconExcitedRef.current?.play()} onMouseLeave={() => iconExcitedRef.current?.stop()}></Lottie>
              <Lottie lottieRef={iconHappyRef} animationData={happy} autoplay={false} onMouseEnter={() => iconHappyRef.current?.play()} onMouseLeave={() => iconHappyRef.current?.stop()}></Lottie>
              <Lottie lottieRef={iconNeutralRef} animationData={neutral} autoplay={false} onMouseEnter={() => iconNeutralRef.current?.play()} onMouseLeave={() => iconNeutralRef.current?.stop()}></Lottie>
              <Lottie lottieRef={iconSadRef} animationData={sad} autoplay={false} onMouseEnter={() => iconSadRef.current?.play()} onMouseLeave={() => iconSadRef.current?.stop()}></Lottie>
            </div>
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

                  <Button type="submit" disabled={loading ? true : false}>
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </FieldGroup>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="lg:w-2/5 w-full">
          <CardHeader>
            <CardTitle>Quote of The Day</CardTitle>
            <CardDescription>This May Make You Strong Than Ever</CardDescription>
          </CardHeader>
          <CardContent className="italic text-center before:content-['-'] after:content-['-'] text-2xl font-medium mt-8">{letter}</CardContent>
        </Card>
      </div>
    </div>
  );
}
