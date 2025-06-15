import { useRouter } from "next/navigation";

import { useUserStore } from "@/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import AuthService, {
  IRegisterPayload,
  IRegisterResponse,
} from "@/services/Auth.service";

const useRegistrationMutation = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<IRegisterResponse, Error, IRegisterPayload>({
    mutationFn: async (payload: IRegisterPayload) => {
      return AuthService.register(payload);
    },
    onSuccess: (data) => {
      setUser(data.user);
      router.push("/");
    },
  });
};

export default useRegistrationMutation;
