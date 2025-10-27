"use server";

import { createAppwriteClient } from "@/lib/appwrite";
import { GoogleGenAI } from "@google/genai";
import { ID } from "node-appwrite";

interface CreateMood {
  mood: string;
  note: string;
  user_id: string;
}

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

    const savedTip = await databases.createDocument("68f37cb90011648a454b", "tips", ID.unique(), {
      mood,
      tip,
      source: "ai",
    });

    const saveMood = await databases.createDocument("68f37cb90011648a454b", "moods", ID.unique(), {
      mood,
      note,
      tip_id: savedTip.$id,
      user_id,
    });

    return saveMood;
  } catch (error: any) {
    return error.message;
  }
};
