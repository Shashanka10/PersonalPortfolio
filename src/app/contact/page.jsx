"use client";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import copy from "clipboard-copy";
import { Check, Copy } from "lucide-react";
import Typewriter from "typewriter-effect";

const Contact = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        }
      )
      .then(
        (result) => {
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          setError(true);
        }
      );
  };

  const handleCopyClick = async () => {
    try {
      await copy("sbishalluitel7@gmail.com");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="flex-col w-full p-5 sm:px-12 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="flex-col mt-10 md:mt-0 space-y-3 ">
          <div>
            <h1 className="text-white text-3xl font-bold">Contact</h1>
          </div>
          <div>
            <p1 className="text-gray-500 text-base font-bold">
              Get in touch for inquiries
            </p1>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-10 space-y-5">
          <div className="space-y-5 md:flex md:space-y-0 md:space-x-16 lg:space-x-32">
            <div>
              <h1 className="text-white text-base font-semibold tracking-wider">
                sbishalluitel7@gmail.com
              </h1>
              <p1 className="text-gray-500 text-sm font-semibold">E-mail</p1>
            </div>
            <div>
              <h1 className="text-white text-base font-semibold tracking-wider">
                <Typewriter
                  options={{
                    strings: ["+977 9813187989"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p1 className="text-gray-500 text-sm font-semibold">Phone</p1>
            </div>
          </div>
          <div>
            <button
              className={`font-medium sm:font-semibold text-white tracking-wider p-3 lg:p-3 w-full border-2 border-[#282828] rounded-xl cursor-pointer flex justify-center gap-4 ${
                isCopied ? "bg-green-600 opacity-80" : ""
              }`}
              onClick={handleCopyClick}
            >
              {isCopied ? (
                <>
                  <Check className="text-green-200" />
                  Copied{" "}
                </>
              ) : (
                <>
                  <Copy /> Copy email
                </>
              )}
            </button>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col space-y-6 sm:space-y-7 mt-10">
          <div>
            <h1 className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans">
              Send a Message
            </h1>
          </div>
          <div>
            <form
              ref={form}
              onSubmit={sendEmail}
              autoComplete="on"
              className="flex-col space-y-5 sm:space-y-6"
            >
              <input
                type="text"
                placeholder="Name"
                className="p-3 lg:p-3 flex w-full rounded-xl text-white bg-[#282828] "
                name="user_name"
                required
              />
              <input
                type="text"
                placeholder="Email"
                className="p-3 lg:p-3 flex w-full rounded-xl text-white bg-[#282828] "
                name="user_email"
                required
              />
              <textarea
                placeholder="Message"
                cols={30}
                rows={8}
                className="p-3 lg:p-3 flex w-full rounded-xl resize-none text-white bg-[#282828] "
                name="user_message"
                required
              />
              <button
                className="font-medium sm:font-semibold text-white tracking-wider p-3 lg:p-3 w-full bg-green-600 rounded-xl cursor-pointer"
                type="submit"
              >
                Send
              </button>
              {success && (
                <span className="text-green-600 font-medium flex justify-center">
                  Your message has been sent sucessfully!!
                </span>
              )}
              {error && (
                <span className="text-red-600 font-medium  flex justify-center">
                  Something went wrong.
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
