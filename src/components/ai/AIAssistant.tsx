import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { askAssistant } from "../../services/aiAssistant";
import type { AssistantAction } from "../../services/aiAssistant";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: AssistantAction[];
}

let messageId = 0;
const nextId = () => ++messageId;

const GREETING: Message = {
  id: nextId(),
  role: "assistant",
  text: "Здравствуйте! Спросите про модель, бренд, бюджет или город — например «что есть в Краснодаре» или «Vellante Corsa».",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: nextId(), role: "user", text: trimmed };
    const reply = askAssistant(trimmed);
    const assistantMsg: Message = { id: nextId(), role: "assistant", text: reply.text, actions: reply.actions };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  const handleAction = (action: AssistantAction) => {
    navigate(action.to);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть ассистента" : "Открыть ассистента"}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-bronze)]/50 bg-[var(--color-obsidian-2)] text-[var(--color-bronze-glow)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 hover:scale-105"
      >
        {open ? (
          <span className="font-display text-xl">✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.1-3.5A7.96 7.96 0 0 1 4 12Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1.1" fill="currentColor" />
            <circle cx="12" cy="12" r="1.1" fill="currentColor" />
            <circle cx="15" cy="12" r="1.1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[70] flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 border-b border-[var(--color-cloud)]/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--color-bronze-glow)]" />
            <p className="font-display text-sm font-semibold text-[var(--color-cloud)]">AI-ассистент AURELIA</p>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[var(--color-bronze)] text-[var(--color-obsidian)]"
                      : "bg-[var(--color-obsidian-3)] text-[var(--color-cloud)]"
                  }`}
                >
                  {m.text}
                </div>
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.actions.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => handleAction(a)}
                        className="rounded-full border border-[var(--color-bronze)]/50 px-3 py-1.5 font-body text-xs font-semibold text-[var(--color-bronze-glow)] transition-colors duration-200 hover:bg-[var(--color-bronze)] hover:text-[var(--color-obsidian)]"
                      >
                        {a.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-[var(--color-cloud)]/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Например: что есть в Казани?"
              className="flex-1 rounded-full border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian-3)] px-4 py-2 font-body text-sm text-[var(--color-cloud)] placeholder:text-[var(--color-cloud-faint)] focus:border-[var(--color-bronze)]/50 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bronze)] text-[var(--color-obsidian)] transition-transform duration-200 hover:scale-105"
              aria-label="Отправить"
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
