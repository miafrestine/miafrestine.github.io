import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";
import "./chat-assistant.css";

const CHAT_API_BASE = (import.meta.env.VITE_CHAT_API_URL ?? "").replace(/\/+$/, "");

const SUGGESTIONS = [
  "About Mia",
  "Projects",
  "Skills",
  "Certificates",
  "OJT availability",
  "View CV",
];

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi! I'm Mia's portfolio assistant. Ask me about her projects, skills, certificates, or OJT availability.",
  },
];

function getPortfolioAnswer(question, projects, certificates) {
  const normalized = question.toLowerCase();

  if (/\b(projects?|portfolio|work|built|created)\b/.test(normalized)) {
    return {
      content: `Here are some projects in Mia's portfolio:\n\n${projects
        .map((project) => `• ${project.title} — ${project.description}`)
        .join("\n\n")}`,
      actions: [{ label: "Explore selected work", href: "#work" }],
    };
  }

  if (/\b(certificates?|credentials?|certifications?)\b/.test(normalized)) {
    return {
      content: `Mia's certificates include:\n\n${certificates
        .map((certificate) => `• ${certificate.title} — ${certificate.issuer}`)
        .join("\n\n")}`,
      actions: [{ label: "View certificates", href: "#certificates" }],
    };
  }

  if (/\b(skills?|toolkit|technologies|tech stack)\b/.test(normalized)) {
    return {
      content:
        "Mia is developing skills in UI/UX and visual design, responsive web design, and front-end development. Her portfolio highlights wireframing, layout, typography, HTML, CSS, JavaScript, and React.",
      actions: [{ label: "Explore skills", href: "#skills" }],
    };
  }

  if (/\b(availability|available|ojt|internship|intern|schedule|hours)\b/.test(normalized)) {
    return {
      content:
        "Mia is currently looking for an OJT opportunity. She is excited to learn, contribute, and grow with a team. Please use the contact form to discuss an opportunity and its schedule.",
      actions: [{ label: "Contact Mia", href: "#contact" }],
    };
  }

  if (/\b(cv|resume|curriculum vitae)\b/.test(normalized)) {
    return {
      content: "You can view or download Mia's CV here.",
      actions: [
        {
          label: "View or download CV",
          href: "/resume.pdf",
          download: "Mia-Patiluna-CV.pdf",
        },
      ],
    };
  }

  if (/\b(contact|email|reach|message)\b/.test(normalized)) {
    return {
      content: "You can send Mia a message through the portfolio contact form.",
      actions: [{ label: "Go to contact form", href: "#contact" }],
    };
  }

  if (/\b(about|mia|summary|candidate|who)\b/.test(normalized)) {
    return {
      content:
        "Mia Patiluna is a fourth-year BSIT student interested in UI/UX and web design. She enjoys the space where design meets technology and is currently seeking an OJT opportunity to contribute and keep growing.",
      actions: [{ label: "Learn more about Mia", href: "#about" }],
    };
  }

  return null;
}

export default function ChatAssistant({ projects, certificates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const toggleRef = useRef(null);
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    inputRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function sendMessage(message = text) {
    const content = message.trim();
    if (!content || busy) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setText("");
    setError("");

    const portfolioAnswer = getPortfolioAnswer(content, projects, certificates);
    if (portfolioAnswer) {
      setMessages([...nextMessages, { role: "assistant", ...portfolioAnswer }]);
      return;
    }

    if (!CHAT_API_BASE) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I can answer questions about Mia, her projects, skills, certificates, OJT availability, and CV. For other questions, please use the contact form.",
          actions: [{ label: "Contact Mia", href: "#contact" }],
        },
      ]);
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${CHAT_API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`The assistant returned an error (${response.status}).`);
      }

      const data = await response.json();
      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The assistant returned an empty response.");
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while contacting the assistant.",
      );
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section
          id="portfolio-chat-panel"
          className="portfolio-chat-panel"
          aria-label="Chat with Mia's portfolio assistant"
        >
          <header className="portfolio-chat-header">
            <div className="portfolio-chat-avatar" aria-hidden="true">
              m.p
            </div>
            <div className="portfolio-chat-heading">
              <h2>Mia&apos;s portfolio assistant</h2>
              <p>
                <span className="portfolio-chat-status" aria-hidden="true" />
                Here to help
              </p>
            </div>
            <button
              className="portfolio-chat-close"
              type="button"
              onClick={() => {
                setIsOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>

          <div
            className="portfolio-chat-conversation"
            aria-label="Conversation"
            aria-live="polite"
          >
            {messages.map((message, index) => {
              const isAssistant = message.role === "assistant";
              return (
                <div
                  className={`portfolio-chat-row ${isAssistant ? "is-assistant" : "is-user"}`}
                  key={`${message.role}-${index}`}
                >
                  <div className="portfolio-chat-message">
                    <span className="portfolio-chat-author">
                      {isAssistant ? "Mia's assistant" : "You"}
                    </span>
                    <p className="portfolio-chat-bubble">{message.content}</p>
                    {message.actions?.length > 0 && (
                      <div className="portfolio-chat-actions">
                        {message.actions.map((action) => (
                          <a
                            key={action.label}
                            href={action.href}
                            download={action.download}
                            target={action.href.startsWith("http") ? "_blank" : undefined}
                            rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                          >
                            {action.label}
                            <ArrowRight size={13} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {busy && (
              <div className="portfolio-chat-row is-assistant">
                <div className="portfolio-chat-message">
                  <span className="portfolio-chat-author">Mia&apos;s assistant</span>
                  <p className="portfolio-chat-bubble">Thinking...</p>
                </div>
              </div>
            )}
            {error && (
              <p className="portfolio-chat-error" role="alert">
                {error} Please try again.
              </p>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <nav className="portfolio-chat-suggestions" aria-label="Suggested questions">
            {SUGGESTIONS.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={busy}
              >
                {suggestion}
              </button>
            ))}
          </nav>

          <form className="portfolio-chat-composer" onSubmit={handleSubmit}>
            <label className="portfolio-chat-visually-hidden" htmlFor="portfolio-chat-input">
              Ask a question about Mia
            </label>
            <input
              id="portfolio-chat-input"
              ref={inputRef}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ask about Mia's portfolio..."
              autoComplete="off"
              disabled={busy}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={busy || !text.trim()}
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="portfolio-chat-caption">
            Thoughtful design. Practical technology.
          </p>
        </section>
      )}

      <button
        ref={toggleRef}
        className="portfolio-chat-toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat-panel"
      >
        {isOpen ? <X size={19} aria-hidden="true" /> : <MessageCircle size={19} aria-hidden="true" />}
        {isOpen ? "Close chat" : "Ask about Mia"}
      </button>
    </div>
  );
}
