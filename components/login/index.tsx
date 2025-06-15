"use client";
import Link from "next/link";

import Form from "@/components/reusable/form";
import Input from "@/components/reusable/input";
import Button from "@/components/reusable/button";
import { FormItem } from "@/components/reusable/form";
import { PASSWORD_REGEX, USERNAME_REGEX } from "@/constants/regex";

const Login = () => {
  const handleFinish = async (values: any) => {
    console.log("Login values:", values);
  };

  return (
    <div className="Login w-xs">
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
          name="password"
          label="Password"
          rules={{
            required: true,
            minLength: {
              value: 5,
              message: `Password must be at least 5 characters long.`,
            },
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
            },
          }}
        >
          <Input />
        </FormItem>

        <div className="flex justify-between items-center">
          <Button>Login</Button>

          <span className="text-xs">
            Don’t have an account yet?{" "}
            <span className="font-bold">
              <Link href="registration">Register</Link>
            </span>
            .
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Login;
