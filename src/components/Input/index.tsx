import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]
  const isError = !!error

  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        className={isError ? styles.error : ''}
        aria-invalid={isError}
        type="text"
        id={name}
        {...rest}
        {...register(name)}
      />
      {isError && <span role="alert">{error.message}</span>}
    </div>
  )
}
