"use client";
import Link from "next/link";

import Form from "@/components/reusable/form";
import Input from "@/components/reusable/input";
import Button from "@/components/reusable/button";
import { FormItem } from "@/components/reusable/form";
import useRegistration from "@/components/registration/registration.hooks";
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "@/constants/regex";

const Registration = () => {
  const { handleFinish } = useRegistration();

  return (
    <div className="Registration w-xs">
      <Form onFinish={handleFinish}>
        <FormItem
          name="username"
          label="Username"
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: `Username must be at least 5 characters long.`,
            },
            pattern: {
              value: USERNAME_REGEX,
              message:
                "Username can only use letters, numbers, underscores, and periods.",
            },
          }}
        >
          <Input />
        </FormItem>

        <FormItem
          name="email"
          label="Email"
          rules={{
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is not valid",
            },
          }}
        >
          <Input />
        </FormItem>
        <FormItem
          name="password"
          label="Password"
          rules={{
            required: true,
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
            },
          }}
        >
          <Input />
        </FormItem>

        <FormItem
          name="repeatPassword"
          label="Repeat password"
          rules={{ match: "password" }}
        >
          <Input />
        </FormItem>

        <div className="flex justify-between items-center">
          <Button>Register</Button>

          <span className="text-xs">
            Already have an account?{" "}
            <span className="font-bold">
              <Link href="login">Login</Link>
            </span>
            .
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
