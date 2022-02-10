import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { useField, FieldAttributes } from 'formik'

interface CustomFieldAttr {
  label?: string,
  multiline?: boolean,
  startAdornment?: string,
  endAdornment?: string | React.ReactNode,
  rows?: string
}

export const FormTextField = ({
  placeholder,
  startAdornment,
  label,
  endAdornment,
  rows,
  ...props
}: FieldAttributes<CustomFieldAttr>) => {
  const [field, meta] = useField<CustomFieldAttr>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      {...field}
      variant='standard'
      rows={rows}
      rowsMax={rows}
      className={props.className}
      fullWidth
      type={props.type}
      label={label}
      multiline={props.multiline}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      InputProps={startAdornment ? {
        startAdornment: <InputAdornment position='start'>{startAdornment}</InputAdornment>
      } : endAdornment ? {
        endAdornment: <InputAdornment position='end'>{endAdornment}</InputAdornment>
      } : undefined}
    />
  )
}
