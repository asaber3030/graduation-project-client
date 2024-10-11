import { LoginProvider } from "@/types"

export const globalQueryKeys = {
  login: (provider: LoginProvider) => ["app", "login", provider],
  hospitals: () => ["app", "hospitals"],
  hospital: (hospitalId: number) => ["app", "hospitals", hospitalId],
}
