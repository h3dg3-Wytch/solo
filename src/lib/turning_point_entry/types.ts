export type TurningPointEntry = {
  id: number; // bigint
  created_at: string; // timestamp with time zone, ISO string
  character_id?: number | null; // foreign key -> character.id
  plot_line_id?: number | null; // foreign key -> plotline.id
  adventure_entry_id?: number | null; // foreign key -> adventure_entry.id
  position?: number | null; // smallint
  user_id?: string | null; // uuid, default generated
  plot_point_id?: number | null; // foreign key -> plot_point.id
};
