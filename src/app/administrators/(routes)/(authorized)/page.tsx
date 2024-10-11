import React from "react"
import { getCurrentAdmin } from "../../(helpers)/_actions/auth"

export default async function Home() {
  const admin = await getCurrentAdmin()
  return <div className="bg-yellow-100">{admin.email}</div>
}
