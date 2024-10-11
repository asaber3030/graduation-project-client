import { loginAction } from "@/actions/auth"
import { adminLoginAction } from "@/app/administrators/(helpers)/_actions/auth"
import { GlobalLoginData, LoginProvider } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useLogin(provider: LoginProvider, onSuccess: Function) {
  const loginMutation = useMutation({
    mutationFn: ({ data, rememberMe }: GlobalLoginData) => loginAction(provider, data, rememberMe),
    onSuccess: (data) => onSuccess(data),
  })

  return {
    mutateLogin: loginMutation.mutate,
    loginData: loginMutation.data,
    loginPending: loginMutation.isPending,
  }
}
