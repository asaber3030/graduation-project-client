import { Control } from "react-hook-form"
import { Input } from "../ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

type Props = {
  label: string
  name: string
  isTextarea?: boolean
  control: Control<any, any>
  type?: string
  disabled?: boolean
  value?: string
  register?: any
  placeholder?: string
  defaultValue?: string | number
  valuseAsNumber?: boolean
}

export const InputField = ({
  name,
  disabled,
  label,
  isTextarea = false,
  placeholder,
  type,
  control,
  register,
  valuseAsNumber,
  defaultValue,
  value,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                disabled={disabled}
                className="resize-none h-32"
                placeholder={placeholder}
                {...field}
              >
                {defaultValue}
              </Textarea>
            ) : (
              <Input
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...field}
                {...register}
                onChange={
                  valuseAsNumber ? (e) => field.onChange(parseInt(e.target.value)) : field.onChange
                }
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
