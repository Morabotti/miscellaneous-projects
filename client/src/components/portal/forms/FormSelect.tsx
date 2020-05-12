import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string,
  defaultOption?: string,
  options: {
    value: string | number,
    label: string
  }[]
}

export const FormSelect = ({
  label,
  defaultOption,
  ...props
}: FieldAttributes<CustomFieldAttr>) => {
  const [field] = useField<CustomFieldAttr>(props)

  return (
    <FormControl variant='standard' fullWidth className={props.className}>
      <InputLabel id='form-select-label'>{label}</InputLabel>
      <Select
        {...field}
        fullWidth
        labelId='form-select-label'
        labelWidth={100}
      >
        {defaultOption && (
          <MenuItem value={''}><em>{defaultOption}</em></MenuItem>
        )}
        {props.options.map((i, j) => (
          <MenuItem key={j} value={i.value}>{i.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
