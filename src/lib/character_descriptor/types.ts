export type CharacterDescriptor = {
  id: number; // bigint in PG maps to number (or string if > MAX_SAFE_INTEGER)
  created_at: string; // ISO timestamp string
  roll: number | null;
  characteristic: string | null;
};
