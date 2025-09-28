import { TurningPointEntry } from "./types";


let nextId = 1; 
export function createTurningPointEntry(
  entry: Partial<Omit<TurningPointEntry, "id" | "created_at">> = {}
): TurningPointEntry {
  return {
    id: nextId++, // mimic sequence identity
    created_at: new Date().toISOString(),
    character_id: null,
    plot_line_id: null,
    adventure_entry_id: null,
    position: null,
    user_id: null,
    plot_point_id: null,
    ...entry, // allow overrides
  };
}
