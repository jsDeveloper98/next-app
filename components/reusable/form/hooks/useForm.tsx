import { useCallback, useState } from "react";

import { IRules, ValidationMode } from "../Form.types";

const useForm = (initialMode: ValidationMode = "onSubmit") => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rules, setRules] = useState<Record<string, IRules>>({});

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const setFieldRules = useCallback((name: string, fieldRules: IRules) => {
    setRules((prev) => ({ ...prev, [name]: fieldRules }));
  }, []);

  const setFieldsValue = useCallback((newValues: Record<string, any>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  const resetFields = useCallback(() => {
    setValues({});
    setErrors({});
  }, []);

  const validateFields = useCallback((): boolean => {
    let isValid = true;
    Object.entries(rules).forEach(([name, rule]) => {
      const value = values[name] || "";
      if (rule.required && !value) {
        setFieldError(name, "This field is required.");
        isValid = false;
      } else if (rule.minLength && value.length < rule.minLength.value) {
        setFieldError(name, rule.minLength.message);
        isValid = false;
      } else if (rule.maxLength && value.length > rule.maxLength.value) {
        setFieldError(name, rule.maxLength.message);
        isValid = false;
      } else if (rule.pattern && !rule.pattern.value.test(value)) {
        setFieldError(name, rule.pattern.message);
        isValid = false;
      } else if (rule.match && value !== values[rule.match]) {
        if (isValid) {
          setFieldError(name, "Password does not match!");
          isValid = false;
        }
      } else {
        setFieldError(name, "");
      }
    });
    return isValid;
  }, [rules, setFieldError, values]);

  return {
    values,
    errors,
    resetFields,
    setFieldValue,
    setFieldRules,
    setFieldError,
    setFieldsValue,
    validateFields,
    validationMode: initialMode,
  };
};

export default useForm;
