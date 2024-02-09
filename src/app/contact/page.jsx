"use client";
import React, { useState, useRef } from "react";
import contact from "../../../public/emailer.png";
import Image from "next/image";
import emailjs from '@emailjs/browser';

const Contact = () => {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, {
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      })
      .then(
        (result) => {
          setSuccess(true)
          form.current.reset()
        },
        (error) => {
          setError(true)
        },
      );
  };

  return (
    <div className="flex justify-between">
      <div className="flex animate-bounce_slow ml-32">
        <Image
          src={contact}
          alt="my_contact"
          className="object-contain"
          width={600}
          height={300}
        />
      </div>
      <div className="flex-col space-y-8 mr-32 mt-10 border p-6 rounded-3xl">
        <div className="flex justify-center">
          <h1 className="text-cyan-300 text-5xl font-bold font-sans">
            Let's Keep in Touch
          </h1>
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          autoComplete="on"
          className="flex-col space-y-3"
        >
          <input
            type="text"
            placeholder="name"
            className="p-3 flex w-full rounded-xl text-black"
            name="user_name"
            required
          />
          <input
            type="text"
            placeholder="email@gmail.com"
            className="p-3 flex w-full rounded-xl text-black"
            name="user_email"
            required
          />
          <textarea
            placeholder="what message do you have for me ....."
            cols={30}
            rows={8}
            className="p-3 flex w-full rounded-xl resize-none text-black"
            name="user_message"
            required
          />
          <button
            className="font-semibold text-white tracking-wider p-3 w-full bg-cyan-700 rounded-xl cursor-pointer"
            type="submit"
          >
            Send
          </button>
          {success && <span className="text-green-600 font-medium flex justify-center">Your message has been sent sucessfully!!</span>}
          {error && <span className="text-red-600 font-medium  flex justify-center">Something went wrong.</span>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
