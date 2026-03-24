"use client";
import React, { useState, useRef, useEffect } from "react";
import copy from "clipboard-copy";
import { Check, Copy, Loader, Send, Mail } from "lucide-react";
import toast from "react-hot-toast";
import Particles from "@/components/Particles/Particles";
import Reveal from "@/components/Reveal/Reveal";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

function FloatingInput({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}) {
  const [focused, setFocused] = useState(false);
  const filled = value && value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-[#222] border rounded-xl px-4 pt-6 pb-3 text-gray-100 text-sm outline-none transition-all duration-300
          ${focused ? "border-[#12c971] shadow-[0_0_0_3px_rgba(18,201,113,0.1)]" : filled ? "border-[#2e2e2e]" : "border-[#2e2e2e] hover:border-[#3a3a3a]"}`}
      />
      <label
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-300
        ${focused || filled ? "top-2 text-[10px] tracking-widest uppercase text-[#12c971]" : "top-1/2 -translate-y-1/2 text-sm text-gray-500"}`}
      >
        {label}
      </label>
      <div
        className={`absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-500 ${focused ? "bg-[#12c971] opacity-60" : "opacity-0"}`}
      />
    </div>
  );
}

function FloatingTextarea({ label, name, required, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const filled = value && value.length > 0;
  return (
    <div className="relative">
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        rows={6}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-[#222] border rounded-xl px-4 pt-7 pb-3 text-gray-100 text-sm outline-none resize-none transition-all duration-300
          ${focused ? "border-[#12c971] shadow-[0_0_0_3px_rgba(18,201,113,0.1)]" : filled ? "border-[#2e2e2e]" : "border-[#2e2e2e] hover:border-[#3a3a3a]"}`}
      />
      <label
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-300
        ${focused || filled ? "top-2 text-[10px] tracking-widest uppercase text-[#12c971]" : "top-4 text-sm text-gray-500"}`}
      >
        {label}
      </label>
      <div
        className={`absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-500 ${focused ? "bg-[#12c971] opacity-60" : "opacity-0"}`}
      />
    </div>
  );
}

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });
  const form = useRef();
  const v0 = useMounted(100);
  const v1 = useMounted(300);

  const handleChange = (e) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));

  const sendEmail = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        toast.success("Message sent successfully!");
        setFields({ user_name: "", user_email: "", user_message: "" });
      } else {
        setError(true);
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to send message.");
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyClick = async () => {
    try {
      await copy("shashankaluitel10@gmail.com");
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      toast.error("Failed to copy email.");
    }
  };

  const fade = (v) =>
    `transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 sm:px-12 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        <Particles count={28} />

        <div
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(18,201,113,0.06) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 space-y-10 max-w-7xl">
          <div className={`${fade(v0)} space-y-3`}>
            <p className="text-[#12c971] font-mono text-xs tracking-[0.25em] uppercase">
              — Get in touch
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight leading-tight">
              Let's work
              <span
                className="text-transparent bg-clip-text ml-3 sm:ml-4 md:ml-5"
                style={{ WebkitTextStroke: "1px rgba(18,201,113,0.6)" }}
              >
                together.
              </span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Whether it's a work opportunity or just a hello, feel free to contact me.
            </p>
          </div>

          <div className={fade(v1)}>
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-[#1e2e22] border border-[#12c971]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#12c971]/15 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#12c971]" />
                  </div>
                  <div>
                    <p className="text-gray-100 font-semibold text-sm sm:text-base tracking-wide">
                      shashankaluitel10@gmail.com
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Primary email
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyClick}
                  className={`flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-300 shrink-0
                    ${isCopied ? "bg-[#12c971] text-[#0d0d0d] border-[#12c971]" : "text-gray-100 border-[#bdbcbc] hover:border-[#12c971] hover:bg-[#12c971]/10"}`}
                >
                  {isCopied ? (
                    <>
                      <Check size={15} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy email
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          </div>

          {/* ── FORM ── */}
          <Reveal>
            <div className="space-y-4">
              <h2 className="text-gray-100 font-bold text-xl sm:text-2xl">
                Send a message
              </h2>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <FloatingInput
                  label="Your name"
                  name="user_name"
                  required
                  value={fields.user_name}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Your email"
                  name="user_email"
                  type="email"
                  required
                  value={fields.user_email}
                  onChange={handleChange}
                />
                <FloatingTextarea
                  label="Your message"
                  name="user_message"
                  required
                  value={fields.user_message}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
                    ${isSubmitting ? "bg-[#0fb862]/60 text-[#0d0d0d] cursor-not-allowed" : "bg-[#12c971] text-[#0d0d0d] hover:bg-[#0fb862] hover:scale-[1.01] active:scale-[0.99]"}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
                {success && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[#12c971]/10 border border-[#12c971]/30">
                    <Check size={16} className="text-[#12c971] shrink-0" />
                    <p className="text-[#12c971] text-sm font-medium">
                      Message sent successfully!
                    </p>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25">
                    <span className="w-4 h-4 rounded-full bg-red-500/30 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </span>
                    <p className="text-red-400 text-sm font-medium">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
