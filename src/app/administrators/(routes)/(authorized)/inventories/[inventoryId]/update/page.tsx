import React from "react"
import AdminPageTitle from "@/app/administrators/(helpers)/_components/common/title"

import { findInventoryById } from "@/app/administrators/(helpers)/_actions/inventories"

import { AdminUpdateInventtoryForm } from "@/app/administrators/(helpers)/_components/inventories/update-form"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { adminRoutes } from "@/app/administrators/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

type Props = {
  params: {
    inventoryId: string
  }
}

export default async function InventoryIdUpdatePage({ params }: Props) {
  const inventoryId = +params.inventoryId
  const inventory = await findInventoryById(inventoryId)

  if (!inventory) return notFound()

  return (
    <div>
      <AdminPageTitle title="Inventories">
        <LinkBtn icon={Plus} variant="outline" href={adminRoutes.inventories.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminUpdateInventtoryForm inventory={inventory} />
    </div>
  )
}
