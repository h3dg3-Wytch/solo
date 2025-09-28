import { createClient } from '@supabase/supabase-js';
import * as R from 'ramda';
import { Character } from './types';

 const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )

// Helpers
const handleError = (error: any) => {
  if (error) throw error;
  return true;
};

// Functional CRUD

// Get all characters for a user
export const getCharacters = async (userId: string): Promise<Character[]> => {
  const { data, error } = await supabase
    .from<Character>('character')
    .select('*')
    .eq('user_id', userId);

  handleError(error);
  return data || [];
};

// Get a character by ID
export const getCharacterById = async (id: number): Promise<Character | null> => {
  const { data, error } = await supabase
    .from<Character>('character')
    .select('*')
    .eq('id', id)
    .single();

  handleError(error);
  return data;
};

// Create a new character
export const createCharacter = async (character: Partial<Omit<Character, 'id' | 'created_at'>>): Promise<Character> => {
  const defaulted = R.mergeRight({ is_default: true }, character);

  const { data, error } = await supabase
    .from<Character>('character')
    .insert(defaulted)
    .single();

  handleError(error);
  return data!;
};

// Update an existing character
export const updateCharacter = async (
  id: number,
  updates: Partial<Omit<Character, 'id' | 'created_at'>>
): Promise<Character> => {
  const { data, error } = await supabase
    .from<Character>('character')
    .update(updates)
    .eq('id', id)
    .single();

  handleError(error);
  return data!;
};

// Delete a character
export const deleteCharacter = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from<Character>('character')
    .delete()
    .eq('id', id);

  handleError(error);
};
