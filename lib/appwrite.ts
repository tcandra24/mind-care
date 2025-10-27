import { Client, Account, Databases, Query } from "node-appwrite";

export function createAppwriteClient(sessionId?: string) {
  const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  if (sessionId) {
    client.setSession(sessionId);
  } else {
    client.setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!);
  }

  return { client, account: new Account(client), databases: new Databases(client), query: Query };
}
