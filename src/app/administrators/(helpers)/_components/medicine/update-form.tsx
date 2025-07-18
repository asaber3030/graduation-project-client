"use client"

import Link from "next/link"
import React from "react"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { adminRoutes } from "../../_utils/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MedicineSchema } from "@/schema"
import { FilterBySearch } from "@/components/common/filter-by-search"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DosageForm } from "@prisma/client"
import { useSearchInventories } from "../../_hooks/useInventory"
import { updateMedicineAction } from "../../_actions/medicine"
import { FileField } from "@/components/common/file-field"
import { FileIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { ATFullMedicine } from "../../_types"

type Mutation = {
  data: z.infer<typeof MedicineSchema.update>
  inventoryId: number
  dosageFormId: number
  formData: FormData
}

type Props = {
  dosageForms: DosageForm[]
  medicine: ATFullMedicine
}

export const AdminUpdateMedicineForm = ({ medicine, dosageForms }: Props) => {
  const form = useForm({
    resolver: zodResolver(MedicineSchema.update),
    defaultValues: {
      arName: medicine.arName,
      enName: medicine.enName,
      arDescription: medicine.arDescription,
      enDescription: medicine.enDescription,
      activeIngredients: medicine.activeIngredients,
      totalTablets: medicine.totalTablets,
      bgColor: medicine.bgColor,
      textColor: medicine.textColor,
      notes: medicine.notes,
      concentration: medicine.concentration,
      price: medicine.price,
      numberOfTape: medicine.numberOfTape,
      numberOfPillsPerTape: medicine.numberOfPillsPerTape,
    },
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedInventoryName, setSelectedSelecetedName] = useState(
    medicine.inventory.name + "#" + medicine.inventory.id
  )
  const [inventoryId, setInventoryId] = useState(medicine.inventory.id)
  const [dosageFormId, setDosageFormId] = useState(medicine.dosageFormId)
  const [image, setImage] = useState<File | undefined>(undefined)
  const [barcode, setBarcode] = useState<File | undefined>(undefined)

  const { inventories, isInventoriesLoading, refetchInventories } =
    useSearchInventories(searchValue)

  const departmentsValues = inventories?.map((inventory) => ({
    id: inventory.id,
    label: inventory.name,
    value: inventory.name + "#" + inventory.id,
  }))

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue)
    setInventoryId(id)
  }

  const updateMutation = useMutation({
    mutationFn: ({ inventoryId, dosageFormId, data, formData }: Mutation) =>
      updateMedicineAction(medicine.id, dosageFormId, inventoryId, data, formData),
    onSuccess: (data) => showResponseMessage(data),
  })

  console.log({ errors: form.formState.errors })

  const handleCreate = () => {
    const formData = new FormData()

    if (image) formData.append("image", image as Blob)
    if (barcode) formData.append("barcode", barcode as Blob)

    updateMutation.mutate({
      data: form.getValues() as z.infer<typeof MedicineSchema.create>,
      inventoryId,
      dosageFormId,
      formData,
    })
  }

  useEffect(() => {
    refetchInventories()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
        <FilterBySearch
          formLabel="Select an inventory"
          value={selectedInventoryName}
          setValue={setSearchValue}
          isLoading={isInventoriesLoading}
          onCommandSelect={onCommandSelect}
          data={departmentsValues}
        />

        <div>
          <Label>Select Dosage Form</Label>
          <Select
            defaultValue={String(dosageFormId)}
            onValueChange={(value) => setDosageFormId(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Dosage Form" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dosageForms.map((dosageForm) => (
                  <SelectItem key={`dosage-form-${dosageForm.id}`} value={String(dosageForm.id)}>
                    {dosageForm.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <FileField
            label="Image"
            icon={FileIcon}
            name="image"
            onChange={(e) => setImage(e.target.files?.[0])}
          />
          <FileField
            label="Barcode Image"
            icon={FileIcon}
            name="barcode"
            onChange={(e) => setBarcode(e.target.files?.[0])}
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField name="arName" placeholder="arName" label="arName" control={form.control} />
          <InputField name="enName" placeholder="enName" label="enName" control={form.control} />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField
            isTextarea
            name="enDescription"
            placeholder="enDescription"
            label="enDescription"
            control={form.control}
          />
          <InputField
            isTextarea
            name="arDescription"
            placeholder="arDescription"
            label="arDescription"
            control={form.control}
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField
            name="activeIngredients"
            placeholder="activeIngredients"
            label="activeIngredients"
            control={form.control}
          />
          <InputField
            valuseAsNumber
            name="totalTablets"
            placeholder="totalTablets"
            label="totalTablets"
            control={form.control}
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField name="bgColor" placeholder="bgColor" label="bgColor" control={form.control} />
          <InputField
            name="textColor"
            placeholder="textColor"
            label="textColor"
            control={form.control}
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField name="notes" placeholder="notes" label="notes" control={form.control} />
          <InputField
            name="concentration"
            placeholder="concentration"
            label="concentration"
            control={form.control}
          />
        </div>

        <InputField
          valuseAsNumber
          name="price"
          placeholder="price"
          label="price"
          control={form.control}
        />

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <InputField
            valuseAsNumber
            name="numberOfTape"
            placeholder="numberOfTape"
            label="numberOfTape"
            control={form.control}
          />
          <InputField
            valuseAsNumber
            name="numberOfPillsPerTape"
            placeholder="numberOfPillsPerTape"
            label="numberOfPillsPerTape"
            control={form.control}
          />
        </div>

        <div className="flex gap-2">
          <LoadingButton variant="blue" loading={updateMutation.isPending}>
            Update
          </LoadingButton>

          <Link href={adminRoutes.medicine.root}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
