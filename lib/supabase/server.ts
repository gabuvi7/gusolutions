import { createClient } from "@supabase/supabase-js";

import { getPublicSupabaseEnv, requirePublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";

export function createServerSupabaseClient() {
  const env = getPublicSupabaseEnv();

  if (!env) {
    return null;
  }

  return createClient<Database>(env.url, env.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function requireServerSupabaseClient() {
  const env = requirePublicSupabaseEnv();

  return createClient<Database>(env.url, env.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
