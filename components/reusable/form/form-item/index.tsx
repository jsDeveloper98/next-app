import React, { InputHTMLAttributes, ReactElement, useEffect } from "react";
import classNames from "classnames";

import { IRules } from "../Form.types";
import { useFormContext } from "../";

interface IProps {
  name: string;
  label?: string;
  rules?: IRules;
  children: ReactElement<any>;
}

const FormItem: React.FC<IProps> = ({ name, label, children, rules = {} }) => {
  const {
    values,
    errors,
    setFieldRules,
    setFieldValue,
    setFieldError,
    validationMode,
  } = useFormContext();

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, value);

    if (validationMode === "onChange") {
      validate(value);
    } else {
      if (errors[name]) {
        setFieldError(name, "");
      }
    }
  };

  const validate = (value: string) => {
    if (rules.required && !value) {
      setFieldError(name, "This field is required.");
      return;
    }
    if (rules.minLength && value.length < rules.minLength.value) {
      setFieldError(name, rules.minLength.message);
      return;
    }
    if (rules.maxLength && value.length > rules.maxLength.value) {
      setFieldError(name, rules.maxLength.message);
      return;
    }
    if (rules.pattern && !rules.pattern.value.test(value)) {
      setFieldError(name, rules.pattern.message);
      return;
    }

    if (rules.match && value !== values[rules.match]) {
      setFieldError(name, "Password does not match!");
      return;
    }

    setFieldError(name, "");
  };

  useEffect(() => {
    setFieldRules(name, rules);
  }, [name, setFieldRules, rules]);

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    id: name,
    onChange: handleChange,
    value: values[name] || "",
    className: classNames(
      errors[name] && [
        "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500",
        "dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500",
      ]
    ),
  };

  const childWithProps = React.cloneElement(children, inputProps);

  return (
    <div className="FormItem mb-5">
      {label && (
        <label
          htmlFor={name}
          className={`block mb-2 text-sm font-medium ${
            errors[name]
              ? "text-red-700 dark:text-red-500"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {label}
        </label>
      )}
      {childWithProps}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default FormItem;
