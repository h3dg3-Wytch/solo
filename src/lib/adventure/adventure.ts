import { identical } from "ramda";
import { Adventure } from "./types";

export function createAdventure(
  overrides: Partial<Adventure> = {}
): Adventure {
  return {
    id: Date.now(), // simple unique id fallback
    created_at: new Date().toISOString(),
    name: null,
    date: null,
    notes: null,
    user_id: null,
    themes_id: null,
    ...overrides, // allow caller to override defaults
  };
}