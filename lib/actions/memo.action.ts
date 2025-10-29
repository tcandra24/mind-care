"use server";

import { createAppwriteClient } from "@/lib/appwrite";
import { GoogleGenAI } from "@google/genai";
import { ID } from "node-appwrite";

interface CreateMood {
  mood: string;
  note: string;
  user_id: string;
}

export const fetch = async (userId: string) => {
  try {
    const { databases, query } = createAppwriteClient();

    const memos = await databases.listDocuments(process.env.NEXT_APPWRITE_DB_ID!, "memos", [query.equal("user_id", userId)]);

    return memos.documents;
  } catch (error: any) {
    return error.message;
  }
};

export const store = async (formData: CreateMood) => {
  try {
    const { mood, note, user_id } = formData;
    const { databases } = createAppwriteClient();

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_GOOGLE_GEMINI_API_KEY,
    });

    const prompt = `
    You are an empathetic AI therapist.
    A user logged the following mood:
    Mood: ${mood}
    Notes: ${note}

    Please write short reflection to help and motivated them understand their emotion better
    and suggest one healthy coping tip.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const tip = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    const saveMemo = await databases.createDocument(process.env.NEXT_APPWRITE_DB_ID!, "memos", ID.unique(), {
      mood,
      note,
      tip_ai: tip,
      source: "gemini",
      user_id,
    });

    return saveMemo;
  } catch (error: any) {
    return error.message;
  }
};
