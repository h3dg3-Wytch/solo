import { Adventure } from "./types";
import { handleError }  from "../utils";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )

export const getAdventureEntriesByUserId = async (userId: String): Promise<Adventure| null> => {
  const { data, error } = await supabase
    .from<AdventureEntry>('adventure_entry')
    .select('*')
    .eq('user_id', userId)
    .single();

  handleError(error);
  return data;
};

