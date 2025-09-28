import { createClient } from '@supabase/supabase-js';
import * as R from 'ramda';
import { Theme, PlotPointCategory } from './types';

 const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  )

// Helper for error handling
const handleError = (error: any) => {
  if (error) throw error;
  return true;
};

// Fetch all themes for a user
export const getThemes = async (userId: string): Promise<Theme[]> => {
  const { data, error } = await supabase
    .from<Theme>('themes')
    .select('*')
    .eq('user_id', userId);

  handleError(error);
  return data || [];
};

// Fetch a single theme by ID
export const getThemeById = async (id: number): Promise<Theme | null> => {
  const { data, error } = await supabase
    .from<Theme>('themes')
    .select('*')
    .eq('id', id)
    .single();

  handleError(error);
  return data;
};

// Create a new theme
export const createTheme = async (
  theme: Partial<Omit<Theme, 'id' | 'created_at'>>
): Promise<Theme> => {
  const defaults: Partial<Theme> = {
    firstPriority: [],
    isCurrentlyOnFourth: false,
  };
  const newTheme = R.mergeRight(defaults, theme);

  const { data, error } = await supabase
    .from<Theme>('themes')
    .insert(newTheme)
    .single();

  handleError(error);
  return data!;
};

// Update an existing theme
export const updateTheme = async (
  id: number,
  updates: Partial<Omit<Theme, 'id' | 'created_at'>>
): Promise<Theme> => {
  const { data, error } = await supabase
    .from<Theme>('themes')
    .update(updates)
    .eq('id', id)
    .single();

  handleError(error);
  return data!;
};

// Delete a theme
export const deleteTheme = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from<Theme>('themes')
    .delete()
    .eq('id', id);

  handleError(error);
};
