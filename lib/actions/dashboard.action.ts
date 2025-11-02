"use server";

import { createAppwriteClient } from "@/lib/appwrite";

interface MemoItem {
  mood: string;
  $createdAt: string;
}

interface MoodCount {
  date: string;
  [mood: string]: string | number;
}

export const fetch = async (userId: string) => {
  try {
    const { databases, query } = createAppwriteClient();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);

    const memos = await databases.listDocuments(process.env.NEXT_APPWRITE_DB_ID!, "memos", [
      query.select(["mood", "$createdAt"]),
      query.equal("user_id", userId),
      query.greaterThanEqual("$createdAt", startDate.toISOString()),
      query.orderAsc("$createdAt"),
    ]);

    // console.log(memos.documents);

    const graph = memos.documents.reduce((acc: MoodCount[], item: MemoItem) => {
      const date = item.$createdAt.split("T")[0];
      const existing = acc.find((entry) => entry.date === date);

      if (existing) {
        existing[item.mood] = ((existing[item.mood] as number) || 0) + 1;
      } else {
        acc = [
          ...acc,
          {
            date,
            [item.mood]: 1,
          },
        ];
      }

      return acc;
    }, []);

    return graph;
  } catch (error: any) {
    return error.message;
  }
};
