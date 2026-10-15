import { useState } from "react";
import { Send } from "lucide-react";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function ContactForm({ children }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New message from your portfolio");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {/* Honeypot spam trap: keep hidden */}
      <input type="checkbox" name="botcheck" className="hidden" />

      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        className="w-full rounded-lg px-4 py-3 bg-white/10 text-white placeholder-white/50"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="w-full rounded-lg px-4 py-3 bg-white/10 text-white placeholder-white/50"
      />
      <textarea
        name="message"
        rows="4"
        placeholder="Your message"
        required
        className="w-full rounded-lg px-4 py-3 bg-white/10 text-white placeholder-white/50"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="button-light disabled:opacity-60"
          style={{ marginTop: 0, border: 0, cursor: "pointer" }}
        >
          {status === "sending" ? "Sending..." : "Send message"} <Send size={17} />
        </button>
        {children}
      </div>

      {status === "success" && (
        <p className="text-green-400">Thanks! Your message was sent.</p>
      )}
      {status === "error" && (
        <p className="text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
