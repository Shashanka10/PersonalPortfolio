"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import useSWR from "swr";

export const metadata = {
  title: 'Dashboard',
  description: 'dashboard page',
}

const Dashboard = () => {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

  console.log(data); 
  return (
    <div className={styles.dashboard}>Dashboard</div>
  )
}

export default Dashboard