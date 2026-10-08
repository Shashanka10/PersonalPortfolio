"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Send, X, BotMessageSquare } from "lucide-react";

const suggestions = [
  "What is Shashanka currently interested in?",
  "What kind of projects has he worked on?",
  "What is his background in software development?",
  "What does he want to research?",
];

export default function AskShashanka() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const askQuestion = async (suggestedQuestion = null) => {
    const trimmed = (suggestedQuestion ?? question).trim();

    if (!trimmed || isTyping) return;

    const conversation = [
      ...messages,
      {
        role: "user",
        content: trimmed,
      },
    ];

    setMessages(conversation);
    setQuestion("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation.slice(-15),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "Sorry, I couldn't process that right now. Please try again.",
          },
        ]);

        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the assistant right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion();
  };

  return (
    <>
      {/* Floating AI button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask Shaya"
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[100] group flex items-center gap-2 cursor-pointer"
      >
        <span className="hidden sm:block opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] font-mono uppercase tracking-[0.18em] text-gray-400 bg-[#151515] border border-white/[0.08] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
          Ask Shaya
        </span>

        <span className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[#12c971] opacity-90 bg-[#151515] border cursor-pointer text-[#0d0d0d] shadow-[0_0_30px_rgba(18,201,113,0.18)] hover:shadow-[0_0_40px_rgba(18,201,113,0.35)] hover:scale-105 active:scale-95 transition-all duration-300">
          <BotMessageSquare
            size={26}
            strokeWidth={2}
            className="transition-transform text-[#12c971] opacity-80 duration-500 group-hover:rotate-12"
          />

          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#12c971] border-2 border-[#1A1A1A]" />
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-[2px]"
        />
      )}

      {/* Chat window */}
      <div
        className={`fixed z-[120] right-3 bottom-3 sm:right-7 sm:bottom-7 w-[calc(100%-24px)] sm:w-[420px] h-[min(680px,calc(100vh-24px))] sm:h-[620px] bg-[#151515] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#12c971]/10 border border-[#12c971]/20 flex items-center justify-center">
              <Bot size={20} className="text-[#12c971]" />
            </div>

            <div>
              <p className="text-sm text-gray-200 font-medium">Ask Shaya</p>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12c971]" />

                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                  AI assistant
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-white/[0.05] transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {messages.length === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-gray-100 font-medium">
                  Hi, I'm Shashanka's AI assistant
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  I can help you explore his projects, research interests,
                  experience, and background.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Try asking Shaya
                </p>

                <div className="space-y-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => askQuestion(suggestion)}
                      disabled={isTyping}
                      className="w-full text-left px-3.5 py-3 rounded-xl border cursor-pointer border-white/[0.06] bg-white/[0.02] text-xs text-gray-400 hover:text-gray-200 hover:border-[#12c971]/20 hover:bg-[#12c971]/[0.04] disabled:opacity-40 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-[#12c971] text-[#0d0d0d] rounded-br-md"
                    : "bg-white/[0.04] border border-white/[0.06] text-gray-300 rounded-bl-md"
                }`}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),

                      ul: ({ children }) => (
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5 space-y-1 mb-2">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-6">{children}</li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-100">
                          {children}
                        </strong>
                      ),

                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#12c971] hover:underline"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />

                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:100ms]" />

                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:200ms]" />
              </div>
            </div>
          )}

          {/* Scroll target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.07]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111] p-1.5 focus-within:border-[#12c971]/30 transition-colors"
          >
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask something..."
              className="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600"
            />

            <button
              type="submit"
              disabled={!question.trim() || isTyping}
              className="w-9 h-9 flex items-center cursor-pointer justify-center rounded-lg bg-[#12c971] text-[#0d0d0d] disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              <Send size={15} />
            </button>
          </form>

          <p className="text-center text-[8px] text-gray-700 font-mono mt-2">
            AI assistant · Information from Shashanka's portfolio site only.
          </p>
        </div>
      </div>
    </>
  );
}
