export type Character = {
  id: number; 
  created_at: string; 
  name?: string | null;
  index?: number | null;
  user_id?: string | null; 
  special_trait?: string | null;
  description?: string | null;
  default_value?: string | null;
  notes?: string | null;
  is_default?: boolean | null;
};
