import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Пока переменные окружения не заданы (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY),
// клиент остаётся null и весь сайт работает на локальных мок-данных — см. src/data/source.ts.
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
