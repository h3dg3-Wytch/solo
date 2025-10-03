import { xor } from "ramda";
import { CharacterSpecialTrait } from "./types";
import { createClient } from "@supabase/supabase-js";
import { handleError } from "../utils";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )


// Functional CRUD

// Get all characters for a user
export const getCharacterSpecialTraits = async (): Promise<CharacterSpecialTrait[]> => {
  const { data, error } = await supabase
    .from<CharacterSpecialTrait>('character_special_trait')
    .select('*');

  handleError(error);
  return data || [];
};
