import { THEMES } from "../types";

export type Theme = {
  id: number; // bigint
  created_at: string; // timestamp with timezone as ISO string
  firstPriority?: THEMES | null;
  isCurrentlyOnFourth?: boolean | null;
  user_id?: string | null; // UUID
  secondPriority?: THEMES;
  thirdPriority?: THEMES | null;
  fourthPriority?: THEMES | null;
  fifthPriority?: THEMES | null;
  adventure_id?: number | null; // bigint
}