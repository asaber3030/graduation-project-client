import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/auth"
import { GlobalLoginData, LoginProvider } from "@/types"

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
