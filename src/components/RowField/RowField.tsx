import { Field } from 'formik'

import S from './RowField.module.scss'
import CS from '@common.module.scss'

interface IRowFieldProps {
  id: string
  placeholder: string
  name: string
  label: string
  error: string | undefined
  touched: boolean | undefined
  type?: 'password' | 'text' | 'email' | 'color' | 'number'
}

const RowField: React.VFC<IRowFieldProps> = ({ id, placeholder, name, label, error, touched, type }) => {
  const hasError = error && touched
  return (
    <div className={S.fieldRow}>
      <label htmlFor={id} className={CS.label}>
        {label}
      </label>
      <Field id={id} type={type} className={CS.field} placeholder={placeholder} name={name} aria-invalid={hasError} />
      {hasError && <span className={S.errorField}>{error}</span>}
    </div>
  )
}

export default RowField
