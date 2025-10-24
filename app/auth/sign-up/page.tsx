import { Card, CardContent } from "@/components/ui/card";
import RegisterForm from "@/components/register-form";

const Register = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
