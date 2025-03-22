import { AuthForm } from "@/components/auth/auth-form";
import { Navbar } from "@/components/layout/navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 bg-gray-50">
        <AuthForm />
      </main>
    </>
  );
} 