import LoginForm from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAILYP-LOGIN",
};

const LoginPage = () => {
  return (
    <main className="LoginPage w-full flex items-center justify-center h-[calc(100vh-64px)]">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
