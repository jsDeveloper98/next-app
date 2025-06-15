import { excludeKeys } from "@/helpers";
import { IRegisterPayload } from "@/services/AuthService";

import useRegistrationMutation from "./registration.mutations";

interface IRegisterForm extends IRegisterPayload {
  repeatPassword: string;
}

const useRegistration = () => {
  const { mutate: register } = useRegistrationMutation();

  const handleFinish = (values: IRegisterForm) => {
    register(excludeKeys(values, ["repeatPassword"]));
  };

  return { handleFinish };
};

export default useRegistration;
