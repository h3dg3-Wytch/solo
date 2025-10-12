import { Adventure } from "./types";
import { handleError }  from "../utils";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )

export const getAdventureByUserId = async (userId: String): Promise<Adventure| null> => {
  const { data, error } = await supabase
    .from<Adventure>('adventure')
    .select('*')
    .eq('user_id', userId)
    .single();

  handleError(error);
  return data;
};


export const updateAdventure = async (
  id: number,
  updates: Partial<Omit<Adventure, 'id' | 'created_at'>>
): Promise<Adventure> => {
  const { data, error } = await supabase
    .from<Adventure>('adventure')
    .update(updates)
    .eq('id', id)
    .single();

  handleError(error);
  return data!;
};