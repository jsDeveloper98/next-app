"use client";
import Link from "next/link";

import Form from "@/components/reusable/form";
import Input from "@/components/reusable/input";
import Button from "@/components/reusable/button";
import RuleService from "@/services/Rule.service";
import { FormItem } from "@/components/reusable/form";
import useRegistration from "@/components/registration/registration.hooks";

const Registration = () => {
  const { handleFinish } = useRegistration();

  return (
    <div className="Registration w-xs">
      <Form onFinish={handleFinish}>
        <FormItem
          name="username"
          label="Username"
          rules={RuleService.getRules("username")}
        >
          <Input />
        </FormItem>

        <FormItem
          name="email"
          label="Email"
          rules={RuleService.getRules("email")}
        >
          <Input />
        </FormItem>
        <FormItem
          name="password"
          label="Password"
          rules={RuleService.getRules("password")}
        >
          <Input />
        </FormItem>

        <FormItem
          name="repeatPassword"
          label="Repeat password"
          rules={RuleService.getRules("repeatPassword")}
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
