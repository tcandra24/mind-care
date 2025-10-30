import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ChangeProfileForm from "@/components/change-profile-form";
import ChangePasswordForm from "@/components/change-password";

const Setting = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs className="w-3/4" defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ChangeProfileForm />
        </TabsContent>
        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Setting;
