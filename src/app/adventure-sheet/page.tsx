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
    
    return <AdventureForm />
}