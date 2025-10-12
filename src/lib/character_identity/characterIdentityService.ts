import { xor } from "ramda";
import { CharacterIdentity } from "./types";
import { createClient } from "@supabase/supabase-js";
import { handleError } from "../utils";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )


// Functional CRUD

// Get all characters for a user
export const getCharacterIdentities = async (): Promise<CharacterIdentity[]> => {
  const { data, error } = await supabase
    .from<CharacterIdentity>('character_identity')
    .select('*');

  handleError(error);
  return data || [];
};
