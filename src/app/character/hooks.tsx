import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../providers";
import { createClient } from "@/utils/supabase/client";

export function useCharacters() {
  const supabase = createClient();
  const user = useUser();

  return useQuery({
    queryKey: ["characters", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("character")
        .select("*")
        .eq("user_id", user.id)
        .order("index", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}


export function useUpdateCharacter() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (character) => {
      const { id, ...rest } = character;
      const { error } = await supabase.from("character").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(["characters"]),
  });
}

export function useCharacter(id?: string | number) {
  const supabase = createClient();
  const user = useUser();

  return useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      if (!user || !id) return null;
      const { data, error } = await supabase
        .from("character")
        .select("*")
        .eq("user_id", user.id)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!id,
  });
}