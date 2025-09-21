export enum THEMES {
    ACTION = "ACTION",
    SOCIAL = "SOCIAL",
    PERSONAL = "PERSONAL",
    TENSION = "TENSION",
    MYSTERY = "MYSTERY"
}

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
};

export type Theme = {
  id: number; // bigint
  created_at: string; // timestamp with timezone as ISO string
  firstPriority?: THEMES[] | null;
  isCurrentlyOnFourth?: boolean | null;
  user_id?: string | null; // UUID
  secondPriority?: THEMES;
  thirdPriority?: THEMES | null;
  fourthPriority?: THEMES | null;
  fifthPriority?: THEMES | null;
  adventure_id?: number | null; // bigint
};