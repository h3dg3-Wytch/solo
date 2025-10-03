import { AdventureEntry } from "./types";
export function createAdventureEntry(params: Partial<AdventureEntry> = {}): AdventureEntry {
  return {
    id: params.id ?? Date.now(), // fallback unique-ish id
    created_at: params.created_at ?? new Date().toISOString(),
    turning_point_number: params.turning_point_number ?? null,
    plotline_id: params.plotline_id ?? null,
    notes: params.notes ?? null,
    user_id: params.user_id ?? null,
    adventure_id: params.adventure_id ?? null,
  };
}