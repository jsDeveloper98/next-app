import Registration from "@/components/registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAILYP-REGISTRATION",
};

const RegistrationPage = () => {
  return (
    <main className="RegistrationPage w-full flex items-center justify-center h-[calc(100vh-64px)]">
      <Registration />
    </main>
  );
};

export default RegistrationPage;
