export type Plotline = {
  id: number; 
  created_at: string; 
  name?: string | null;
  table_id?: number | null; 
  user_id?: string | null; 
  description?: string | null;
  index?: number | null; 
  is_default?: boolean | null;
  default_value?: string | null;
  isNewPlotline?: boolean | null;
  isDevelopment?: boolean | null;
  isConclusion?: boolean | null;
}