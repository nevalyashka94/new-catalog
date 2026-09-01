import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export default function AdminGate({ onClose }: { onClose: () => void }) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError(true);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-[var(--color-cloud)]/10 bg-[var(--color-obsidian-2)] p-6"
      >
        <h3 className="font-display text-lg font-semibold text-[var(--color-cloud)]">Вход в админку</h3>
        <p className="mt-1 font-body text-xs text-[var(--color-cloud-faint)]">
          Редактирование карточек автомобилей.
        </p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Пароль"
          className="mt-4 w-full rounded-xl border border-[var(--color-cloud)]/15 bg-[var(--color-obsidian)] px-4 py-2.5 font-body text-sm text-[var(--color-cloud)] outline-none focus:border-[var(--color-bronze)]"
        />
        {error && <p className="mt-2 font-body text-xs text-red-400">Неверный пароль.</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[var(--color-bronze)] py-2.5 font-body text-sm font-semibold text-[var(--color-obsidian)] hover:bg-[var(--color-bronze-glow)]"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
