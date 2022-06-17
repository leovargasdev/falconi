import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: {
    message: string
  }
}

export const Input = ({ name, label, error, ...rest }: InputProps) => {
  const { register } = useFormContext()

  return (
    <div className={styles.container}>
      <label htmlFor="">{label}</label>
      <input
        className={error?.message ? styles.error : ''}
        type="text"
        {...rest}
        {...register(name)}
      />
      {!!error?.message && <span>{error.message}</span>}
    </div>
  )
}
