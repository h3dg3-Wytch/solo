'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const supabase = createClient();
  
  console.log('in the ser provider')

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

type AppDataContextType = {
  plotPoints: any[] | undefined
  descriptors: any[] | undefined
  identities: any[] | undefined
  traits: any[] | undefined
  isLoading: boolean
  error: unknown
}

const AppDataContext = createContext<AppDataContextType | null>(null)

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  // helper for querying a table once
  function useTableQuery<T>(table: string) {
    return useQuery({
      queryKey: [table],
      queryFn: async () => {
        const { data, error } = await supabase.from(table).select('*').order('id')
        if (error) throw error
        return data as T[]
      },
      staleTime: Infinity 
    })
  }

  const { data: plotPoints, isLoading: ppLoading, error: ppError } = useTableQuery('plot_point')
  const { data: descriptors, isLoading: dLoading, error: dError } = useTableQuery('character_descriptor')
  const { data: identities, isLoading: iLoading, error: iError } = useTableQuery('character_identity')
  const { data: traits, isLoading: tLoading, error: tError } = useTableQuery('character_special_trait')

  const isLoading = ppLoading || dLoading || iLoading || tLoading
  const error = ppError || dError || iError || tError

  return (
    <AppDataContext.Provider
      value={{
        plotPoints,
        descriptors,
        identities,
        traits,
        isLoading,
        error,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used inside AppDataProvider')
  return ctx
}