export type PlotPoint = {
  id: number; // bigint
  created_at: string; // timestamp with time zone (ISO string)
  name?: string | null; // varchar
  description?: string | null; // text
  dice_rolls?: number[] | null; // smallint[]
  category?: string | null; // public.plot_point_category (enum type in Postgres)
  is_character?: boolean | null; // default false
  is_plotline?: boolean | null; // default false
};
