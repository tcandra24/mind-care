"use client";

import { Card, CardFooter, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";

const MyProfile = () => {
  const { user } = useAuthStore();
  return (
    <>
      <div className="flex flex-1 gap-4 p-4">
        <div className="w-full">
          <Card className="lg:w-1/4 w-full mx-auto">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>List of What You Think Early</CardDescription>
              {/* <CardAction>
                <Button variant="ghost">Change Profile</Button>
              </CardAction> */}
              <CardContent className="px-0">
                <div className="flex flex-col gap-3 my-3 w-full">
                  <div className="flex gap-5 border-b-2 py-2 px-3">
                    <p className="text-sm font-bold">Name :</p>
                    <p className="text-sm">{user.name}</p>
                  </div>
                  <div className="flex gap-5 border-b-2 py-2 px-3">
                    <p className="text-sm font-bold">Email :</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="flex gap-5 border-b-2 py-2 px-3">
                    <p className="text-sm font-bold">Phone</p>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Link href={"/setting"}>
                <Button variant="outline">Change Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
