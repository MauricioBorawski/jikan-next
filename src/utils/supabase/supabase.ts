import {createClient} from "@supabase/supabase-js";
import type {Database} from "@/types/Supabase/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "supabase_url";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "supabase_key";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);