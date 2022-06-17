import Head from 'next/head'
import { NextPage } from 'next'

import { Slide } from 'components/Slide'
import { FormContact } from 'components/FormContact'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Falconi</title>
    </Head>

    <div className={styles.content}>
      <FormContact />
      <Slide />
    </div>
  </div>
)

export default HomePage
