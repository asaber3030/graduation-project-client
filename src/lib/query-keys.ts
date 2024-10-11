import { LoginProvider } from "@/types"

export const globalQueryKeys = {
  login: (provider: LoginProvider) => ["app", "login", provider],
}
