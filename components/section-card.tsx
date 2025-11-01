"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect } from "react";

import angry from "@/constant/angry.json";
import anxious from "@/constant/anxious.json";
import excited from "@/constant/excited.json";
import happy from "@/constant/happy.json";
import neutral from "@/constant/neutral.json";
import sad from "@/constant/sad.json";

import { useAuthStore } from "@/store/auth";
import { useMemoStore } from "@/store/memo";

const SectionCard = () => {
  const { user } = useAuthStore();
  const { getData, loading, memos } = useMemoStore();

  useEffect(() => {
    if (user?.id) getData(user.id);
  }, [user.id]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Happy</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={happy} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "happy").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sad</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={sad} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "sad").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Neutral</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={neutral} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "neutral").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Angry</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={angry} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "angry").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anxious</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={anxious} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "anxious").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Excited</CardDescription>
          <CardAction>
            <Lottie className="w-20" animationData={excited} autoplay={true}></Lottie>
          </CardAction>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "excited").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SectionCard;
