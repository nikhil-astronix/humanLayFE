import { AuthForm } from "@/components/auth/auth-form";
import { Navbar } from "@/components/layout/navbar";

export default function RegisterPage() {
  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50">
      <Navbar />
      <div className="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthForm />
      </div>
    </div>
  );
}
