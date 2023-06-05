"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import useSWR from "swr";
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'Dashboard',
  description: 'dashboard page',
}

const Dashboard = () => {

  const session = useSession();
  console.log(session);

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

  return (
    <div className={styles.dashboard}>Dashboard</div>
  )
}

export default Dashboard