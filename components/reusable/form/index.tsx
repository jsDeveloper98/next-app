"use client";
import React, { createContext, useContext } from "react";
import classNames from "classnames";

import { useForm } from "./hooks";
export { default as FormItem } from "./form-item";
import { IFormContext, ValidationMode } from "./Form.types";

const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form.Item must be used within a Form");
  }
  return context;
};

interface FormProps<T = Record<string, any>> {
  className?: string;
  children: React.ReactNode;
  validationMode?: ValidationMode;
  form?: IFormContext<T>;
  onFinish: (values: T) => void;
}

function Form<T = Record<string, any>>({
  onFinish,
  children,
  className,
  form: passedForm,
  validationMode = "onSubmit",
}: FormProps<T>) {
  const internalForm = useForm(validationMode);
  const form = passedForm ?? (internalForm as IFormContext<T>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateFields()) {
      onFinish(form.values);
    }
  };

  return (
    <FormContext.Provider value={form}>
      <form
        onSubmit={handleSubmit}
        className={classNames("Form w-full", className)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
