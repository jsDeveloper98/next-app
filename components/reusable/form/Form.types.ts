export type ValidationMode = "onSubmit" | "onChange";

export interface IRules {
  match?: string;
  required?: boolean;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
}

export interface IFormContext<T = Record<string, any>> {
  values: T;
  validateFields: () => boolean;
  validationMode: ValidationMode;
  errors: Partial<Record<keyof T, string>>;
  setFieldError: (name: keyof T, error: string) => void;
  setFieldRules: (name: keyof T, rules: IRules) => void;
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
}
