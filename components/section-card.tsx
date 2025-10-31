"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

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
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "happy").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sad</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "sad").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Neutral</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "neutral").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Angry</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "angry").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Anxious</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "anxious").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Excited</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">{memos.filter((element) => element.mood === "excited").length ?? 0}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SectionCard;
