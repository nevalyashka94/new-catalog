import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

// Внимание: это ЛЁГКАЯ клиентская защита UI (скрыть/показать кнопки редактирования),
// а не настоящая аутентификация — пароль виден в собранном JS-бандле.
// Для реальной защиты данных нужны Supabase Auth + RLS-политики на таблицах
// (как уже сделано в исходном car-catalog через ProtectedRoute/Login).
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || "aurelia2026";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("aurelia-admin") === "1"
  );

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("aurelia-admin", "1");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("aurelia-admin");
  };

  return <AdminContext.Provider value={{ isAdmin, login, logout }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
