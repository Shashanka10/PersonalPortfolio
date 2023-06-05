"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc"

const Login = () => {

  const session = useSession();
  const router = useRouter();
  
  if(session.status === "loading"){
    return <p>Loading ...</p>
  }
  if(session.status === "authenticated"){
    router?.push("/dashboard")
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <h2>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.reg}>Login</button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.goog}
      >
        Login with Google <FcGoogle className={styles.icon}/>
      </button>
      <span className={styles.or}>--- OR ---</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;