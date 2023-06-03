import React from 'react'
import styles from "./page.module.css"

const layout = ({children}) => {
  return (
    <div className={styles.layout}>
        <h1>My Works</h1>
        {children}
    </div>
  )
}

export default layout