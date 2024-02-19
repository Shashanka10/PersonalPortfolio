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
    <div className="flex pr-4 pl-4 sm:pr-0 sm:pl-0 justify-center sm:justify-around">
      <div className="hidden sm:flex sm:items-center animate-bounce_slow sm:ml-2 md:ml-10 lg:ml-16">
        <Image
          src={contact}
          alt="my_contact"
          className="object-contain w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          width={600}
          height={300}
        />
      </div>
      <div className="flex-col space-y-5 md:space-y-7 sm:mr-8 md:mr-10 lg:mr-16 mt-2 sm:mt-4 lg:mt-8 border p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl">
        <div className="flex justify-center">
          <h1 className="text-cyan-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans">
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
            className="p-2 lg:p-3 flex w-full rounded-xl text-black"
            name="user_name"
            required
          />
          <input
            type="text"
            placeholder="email@gmail.com"
            className="p-2 lg:p-3 flex w-full rounded-xl text-black"
            name="user_email"
            required
          />
          <textarea
            placeholder="what message do you have for me ....."
            cols={30}
            rows={8}
            className="p-2 lg:p-3 flex w-full rounded-xl resize-none text-black"
            name="user_message"
            required
          />
          <button
            className="font-medium sm:font-semibold text-white tracking-wider p-2 lg:p-3 w-full bg-cyan-700 rounded-xl cursor-pointer"
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
