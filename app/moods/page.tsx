"use client";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";
import { useMoodStore } from "@/store/mood";
import { useEffect, useState } from "react";

export default function Moods() {
  const { user } = useAuthStore();
  const { getData: getAllData } = useMoodStore();

  const [moods, setMoods] = useState([]);

  const getData = async (id: string) => {
    const response = await getAllData(id);

    setMoods(response.response);
  };

  useEffect(() => {
    getData(user.id);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>List of Moods</CardTitle>
          <CardDescription>Moods</CardDescription>
          <CardAction>
            <Link href={"/moods/create"}>
              <Button variant="default">Create</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent Moods.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mood</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moods &&
                moods.map((mood) => (
                  <TableRow key={mood["$id"]}>
                    <TableCell className="font-medium">
                      <Badge variant="default">{mood.mood}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-wrap">{mood.note}</p>
                    </TableCell>
                    <TableCell className="text-wrap">
                      <p className="text-wrap">{mood.tip.tip}</p>
                    </TableCell>
                    <TableCell className="text-right">{mood["$createdAt"]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
