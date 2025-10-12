import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../providers";
import { createClient } from "@/utils/supabase/client";

export function usePlotlines() {
  const supabase = createClient();
  const user = useUser();

  return useQuery({
    queryKey: ["plotlines", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("plotline")
        .select("*")
        .eq("user_id", user.id)
        .order("index", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useUpdatePlotline() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plotline) => {
      const { id, ...rest } = plotline;
      const { error } = await supabase
        .from("plotline")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["plotlines"]);
    },
  });
}

export function useCreatePlotline() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plotline) => {
      const { error } = await supabase.from("plotline").insert([plotline]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(["plotlines"]),
  });
}

export function usePlotline(id?: string | number) {
  const supabase = createClient();
  const user = useUser();

  return useQuery({
    queryKey: ["plotline", id],
    queryFn: async () => {
      if (!user || !id) return null;
      const { data, error } = await supabase
        .from("plotline")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!id,
  });
}
