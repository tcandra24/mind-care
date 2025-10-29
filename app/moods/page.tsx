"use client";

import { Bot } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";
import { useMemoStore } from "@/store/memo";
import { useEffect, useState } from "react";
import { getMoodColor } from "@/lib/utils";

export default function Moods() {
  const { user } = useAuthStore();
  const { getData: getAllData, loading, memos } = useMemoStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sheetData, setSheetData] = useState<string>("");

  const getData = async (id: string) => {
    await getAllData(id);
  };

  const dateFormat = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    hourCycle: "h24",
    minute: "2-digit",
  });

  const titleFormat = (datetime: string) => {
    return `${new Date(datetime).getDay()}/${new Date(datetime).getMonth()}/${new Date(datetime).getFullYear()}`;
  };

  const handleOpenSheet = (tip_ai: string) => {
    setSheetData(tip_ai);
    setIsOpen(true);
  };

  useEffect(() => {
    if (user?.id) getData(user.id);
  }, [user.id]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Memos</CardTitle>
          <CardDescription>List of What You Think Early</CardDescription>
          <CardAction>
            <Link href={"/moods/create"}>
              <Button variant="default">Create</Button>
            </Link>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {!loading &&
          memos.map((memo) => (
            <Card key={memo.$id} style={{ backgroundColor: getMoodColor(memo.mood) }}>
              <CardHeader>
                <CardTitle className="font-bold">{titleFormat(memo["$createdAt"])}</CardTitle>
                <CardAction>
                  <Button variant="secondary" onClick={() => handleOpenSheet(memo.tip_ai)}>
                    <Bot />
                    AI Answer
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Badge variant="secondary" className="bg-gray-100">
                    {memo.mood}
                  </Badge>
                  <div>
                    <p className="text-sm font-bold">{dateFormat.format(new Date(memo["$createdAt"]))}</p>
                    <p>{memo.note}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Bot /> AI Answer
              </SheetTitle>
              <SheetDescription className="text-justify text-lg">
                <ScrollArea className="h-[600px] italic">{sheetData ?? "AI Answer will appear here."}</ScrollArea>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
