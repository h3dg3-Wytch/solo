import { createClient } from "@/utils/supabase/client";
import { useUser } from "../providers";
import { useQuery,useQueryClient, useMutation } from "@tanstack/react-query";


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

export function useCreateTurningPointEntry() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (newEntry: {
      adventure_entry_id: number;
      plot_point_id?: number;
      character_id?: number;
      position?: number;
    }) => {
      const { data, error } = await supabase
        .from("turning_point_entry")
        .insert(newEntry)
        .select("*")

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // refresh entries after insert
      queryClient.invalidateQueries(["adventure_entries"]);
    },
  });
}

export function useCreateAdventureWithTurningPoints() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({
      user_id,
      adventure_id,
    }: {
      user_id: string;
      adventure_id?: number | null;
    }) => {
      // Step 1: Create the adventure_entry
      const { data: adventureEntry, error: advError } = await supabase
        .from("adventure_entry")
        .insert([
          {
            user_id,
            adventure_id,
            turning_point_number: null,
            notes: null,
          },
        ])
        .select("*")
        .single();

      if (advError) throw advError;

      // Step 2: Create 5 turning_point_entries tied to that adventure_entry
      const turningPointsPayload = Array.from({ length: 5 }).map((_, idx) => ({
        adventure_entry_id: adventureEntry.id,
        user_id,
        position: idx + 1,
      }));

      const { data: turningPoints, error: tpError } = await supabase
        .from("turning_point_entry")
        .insert(turningPointsPayload)
        .select("*");

      if (tpError) throw tpError;

      return {
        adventureEntry,
        turningPoints,
      };
    },

    onSuccess: () => {
      // Invalidate so UI refreshes
      queryClient.invalidateQueries(["adventure_entries"]);
    },
  });
}

