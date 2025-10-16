import { createClient } from "@/utils/supabase/client";
import { useUser } from "../providers";
import { useQuery } from "@tanstack/react-query";


const supabase = createClient();

export function useAdventureEntries(id: string) {
  return useQuery({
    queryKey: ['adventure_entries', id], // cache key includes userId
    queryFn: () => fetchAdventureEntries(id),
    enabled: !!id, // only runs if userId is defined
  })
}

async function fetchAdventureEntries(id: string) {
const { data, error } = await supabase
  .from('adventure_entry')
  .select(`
    id,
    created_at,
    turning_point_number,
    notes,
    adventure_id,
    plotline:plotline_id (
      id,
      name,
      description,
      index,
      is_default,
      isNewPlotline,
      isDevelopment,
      isConclusion
    ),
    turning_point_entry (
      id,
      created_at,
      position,
      character:character_id (
        id,
        name,
        index,
        special_trait,
        description,
        default_value,
        notes,
        is_default
      ),
      plotline:plot_line_id (
        id,
        name,
        description,
        index,
        is_default,
        isNewPlotline,
        isDevelopment,
        isConclusion
      ),
      plot_point:plot_point_id (
        id,
        description
      )
    )
  `)
  .eq('user_id', id)
  .order('position', { foreignTable: 'turning_point_entry', ascending: true })

  

    if (error) {
      console.error("Error fetching:", error)
    } else {
      console.log("Deep joined adventure entries:", data)
    }

    return data;

}
