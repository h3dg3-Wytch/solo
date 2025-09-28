import { createClient } from '@supabase/supabase-js';
import * as R from 'ramda';
import { Plotline } from './types';

 const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  );

// Helper to handle errors
const handleError = (error: any) => {
  if (error) throw error;
  return true;
};

// Fetch all plotlines for a user
export const getPlotlines = async (userId: string): Promise<Plotline[]> => {
  const { data, error } = await supabase
    .from<Plotline>('plotline')
    .select('*')
    .eq('user_id', userId);

  handleError(error);
  return data || [];
};

// Fetch a single plotline by ID
export const getPlotlineById = async (id: number): Promise<Plotline | null> => {
  const { data, error } = await supabase
    .from<Plotline>('plotline')
    .select('*')
    .eq('id', id)
    .single();

  handleError(error);
  return data;
};

// Create a new plotline
export const createPlotline = async (
  plotline: Partial<Omit<Plotline, 'id' | 'created_at'>>
): Promise<Plotline> => {
  // Apply defaults
  const defaults = {
    is_default: true,
    isNewPlotline: false,
    isDevelopment: false,
    isConclusion: false,
  };
  const newPlotline = R.mergeRight(defaults, plotline);

  const { data, error } = await supabase
    .from<Plotline>('plotline')
    .insert(newPlotline)
    .single();

  handleError(error);
  return data!;
};

// Update an existing plotline
export const updatePlotline = async (
  id: number,
  updates: Partial<Omit<Plotline, 'id' | 'created_at'>>
): Promise<Plotline> => {
  const { data, error } = await supabase
    .from<Plotline>('plotline')
    .update(updates)
    .eq('id', id)
    .single();

  handleError(error);
  return data!;
};

// Delete a plotline
export const deletePlotline = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from<Plotline>('plotline')
    .delete()
    .eq('id', id);

  handleError(error);
};
