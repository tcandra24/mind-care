"use client";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";
import { useMemoStore } from "@/store/memo";
import { useEffect } from "react";

export default function Moods() {
  const { user } = useAuthStore();
  const { getData: getAllData, loading, memos } = useMemoStore();

  const getData = async (id: string) => {
    await getAllData(id);
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
        {/* <CardContent>
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
              {!loading &&
                memos.map((memo) => (
                  <TableRow key={memo["$id"]}>
                    <TableCell className="font-medium">
                      <Badge variant="default">{memo.mood}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-wrap">{memo.note}</p>
                    </TableCell>
                    <TableCell className="text-wrap">
                      <p className="text-wrap">{memo.tip_ai}</p>
                    </TableCell>
                    <TableCell className="text-right">{memo["$createdAt"]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent> */}
      </Card>
    </div>
  );
}
