import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getCharacters } from '@/lib/character/characterService'
import { getPlotlines } from '@/lib/plotline/plotlineService'
import { PlotPointTable } from '@/lib/plot_point/plotPointTable'
import AdventureCrafter from '@/lib/AdventureCrafter/adventureCrafter'
import AdventureForm from './adventure-form'


export default async function AdventureSheet() {
    const supabase = await createClient()

    const {
        error,
        data: { user },
    } = await supabase.auth.getUser()
    
    console.log('user', user)
    
    if(error || !user) {
        redirect('/login')
    }
    // const { data: characters } = await supabase.from("character").select("*").eq('user_id', user?.id);
    // 
    // const characters = await getCharacters(user?.id);
    // const plotlines = await getPlotlines(user?.id);
    // const { data: plotlines, error: e } = await supabase.from("plotline").select("*").eq('user_id', user?.id);
    
    // console.log('characters', characters );
    // console.log('plotline', plotlines);
    // 

    const adv = await AdventureCrafter(user?.id);
    console.log('Adventure Crafter', adv);
    

    return <AdventureForm adventureCrafter={adv} user={user} />
}