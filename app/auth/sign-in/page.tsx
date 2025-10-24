import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/login-form";

const Login = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
