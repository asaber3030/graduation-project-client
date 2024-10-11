import { getCurrentAdmin } from "@/app/administrators/(helpers)/_actions/auth"
import LoginButton from "@/app/administrators/(helpers)/_components/login"
import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin()
  if (admin) return redirect(adminRoutes.dashboard.root)

  return (
    <div>
      <LoginButton />
    </div>
  )
}
