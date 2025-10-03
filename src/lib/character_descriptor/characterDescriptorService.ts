import { xor } from "ramda";
import { CharacterDescriptor } from "./types";
import { createClient } from "@supabase/supabase-js";
import { handleError } from "../utils";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )


// Functional CRUD

// Get all characters for a user
export const getCharacterDescriptors = async (): Promise<CharacterDescriptor[]> => {
  const { data, error } = await supabase
    .from<CharacterDescriptor>('character_descriptor')
    .select('*');

  handleError(error);
  return data || [];
};
