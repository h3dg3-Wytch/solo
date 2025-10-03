import { xor } from "ramda";
import { PlotPoint } from "./types";
import { createClient } from "@supabase/supabase-js";
import { handleError } from "../utils";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
)


// Functional CRUD

// Get all characters for a user
export const getPlotPoints = async (): Promise<PlotPoint[]> => {
  const { data, error } = await supabase
    .from<PlotPoint>('plot_point')
    .select('*');

  handleError(error);
  return data || [];
};
