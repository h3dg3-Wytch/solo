export type AdventureEntry = {
  id: number; // bigint
  created_at: string; // timestamp with time zone (ISO string)
  turning_point_number?: number | null; // smallint
  plotline_id?: number | null; // FK -> plotline.id
  notes?: string | null; // text
  user_id?: string | null; // uuid, default gen_random_uuid()
  adventure_id?: number | null; // FK -> adventure.id
};

export const AdventureEntry = () => ({});