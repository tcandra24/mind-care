"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ucwords } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
const AlertWelcome = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Alert variant="default">
        <AlertTitle>Welcome {ucwords(user.name)}!</AlertTitle>
        <AlertDescription>Thank you for coming back. Today is a new opportunity to better understand and care for yourself.</AlertDescription>
      </Alert>
    </>
  );
};

export default AlertWelcome;
