import Head from 'next/head'
import { useState } from 'react'
import { NextPage } from 'next'
import { FaChevronRight } from 'react-icons/fa'

import { Slide } from 'components/Slide'
import { FormContact } from 'components/FormContact'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  const onCloseForm = () => setIsOpenMobile(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Falconi</title>
      </Head>

      <div className={styles.content}>
        <img src="/logo.png" alt="Logo Falconi" />

        <FormContact isOpenMobile={isOpenMobile} onClose={onCloseForm} />
        <Slide />

        <button type="button" onClick={() => setIsOpenMobile(true)}>
          Quero cadastrar minha empresa
        </button>
      </div>

      <a href="/">
        Acessar site <FaChevronRight />
      </a>
    </div>
  )
}

export default HomePage
