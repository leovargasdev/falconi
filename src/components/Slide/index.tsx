import { useState } from 'react'
import styles from './styles.module.scss'

export const Slide = () => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Projetos</h1>
      <h2>
        Garanta que as ideias de crescimento e inovação serão adequadamente
        tratadas e transformadas em realidade.
      </h2>

      <img src="/undraw_organizing_projects.png" alt="" />

      <div className={styles.controler}>
        <button
          onClick={() => setActiveItem(0)}
          className={activeItem === 0 ? styles.active : ''}
        ></button>

        <button
          onClick={() => setActiveItem(1)}
          className={activeItem === 1 ? styles.active : ''}
        ></button>

        <button
          onClick={() => setActiveItem(2)}
          className={activeItem === 2 ? styles.active : ''}
        ></button>
      </div>
    </div>
  )
}
