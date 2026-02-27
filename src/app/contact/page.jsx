"use client";
import React, { useState, useRef } from "react";
import copy from "clipboard-copy";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const Contact = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setIsSubmitting(true);

    const formData = new FormData(form.current);
    const data = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      user_message: formData.get("user_message"),
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        toast.success("Email sent successfully");
        form.current.reset();
      } else {
        setError(true);
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error("Error sending email:", error);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyClick = async () => {
    try {
      await copy("shashankaluitel10@gmail.com");
      setIsCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to copy email");
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
        <div className="mt-10 space-y-5 md:flex md:space-y-0 md:space-x-16 lg:space-x-32 justify-between items-center">
          <div>
            <h1 className="text-white text-base font-semibold tracking-wider">
              shashankaluitel10@gmail.com
            </h1>
            <p1 className="text-gray-500 text-sm font-semibold">E-mail</p1>
          </div>
          <div>
            <button
              className={`font-medium sm:font-semibold text-white tracking-wider p-3 lg:p-3 w-full border-2 border-[#282828] rounded-xl cursor-pointer flex justify-center gap-4 ${isCopied ? "bg-green-600 opacity-80" : ""
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
                type="email"
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
                {isSubmitting ? <div className="flex item-center justify-center gap-1">Sending<Loader className="animate-spin" /></div> : "Send Message"}
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
