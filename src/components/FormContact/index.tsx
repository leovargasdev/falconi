/* eslint-disable multiline-ternary */
import axios from 'axios'
import * as yup from 'yup'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'

import { Input } from 'components/Input'

import styles from './styles.module.scss'

const schema = yup
  .object({
    company: yup.string().required('O nome da empresa é obrigatório'),
    email: yup
      .string()
      .required('O email é obrigatório')
      .email('O formato do email está incorreto'),
    phone: yup.string().required('O telefone é obrigatório')
  })
  .required()

interface FormContactProps {
  isOpenMobile: boolean
  onClose: () => void
}

export const FormContact = ({ isOpenMobile, onClose }: FormContactProps) => {
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const useFormMethods = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const onSubmit = async data => {
    setLoading(true)
    try {
      await axios.post('/api/send-company', data)
      useFormMethods.reset()
      setIsSuccess(true)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container} data-open={String(isOpenMobile)}>
      <img src="/logo.png" alt="Logo Falconi" />

      {isSuccess ? (
        <div className={styles.success}>
          <img src="/undraw_mail_sent.png" alt="" />

          <h3>Cadastro recebido!</h3>

          <p>
            Agora nosso time vai entrar em contato para apresentar a proposta
            ideal para sua empresa.
          </p>

          <span onClick={onClose}>agora é só aguardar :)</span>
        </div>
      ) : (
        <FormProvider {...useFormMethods}>
          <form
            className={styles.form}
            onSubmit={useFormMethods.handleSubmit(onSubmit)}
          >
            <div className={styles.form__info}>
              <h3>Qual é a sua empresa?</h3>
              <p>Vamos montar a solução ideal para seu negócio </p>
            </div>

            <Input
              name="company"
              label="Nome da empresa"
              placeholder="digite o nome da empresa"
            />

            <Input name="email" label="Email" placeholder="contato@email.com" />

            <Input
              name="phone"
              label="Telefone"
              placeholder="__ ____________"
            />

            <Input
              type="number"
              name="employees"
              label="Número funcionários"
              placeholder="1-50"
            />

            <button
              type="submit"
              disabled={!useFormMethods.formState.isValid}
              className={loading ? styles.loading : ''}
            >
              {!loading && 'enviar'}
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}
