export type Adventure = {
  id: number; // bigint
  created_at: string; // timestamp with time zone (ISO string)
  name?: string | null; // varchar
  date?: string | null; // timestamp with time zone (ISO string)
  notes?: string | null; // text
  user_id?: string | null; // uuid
  themes_id?: number | null; // bigint (FK -> themes.id)
};
