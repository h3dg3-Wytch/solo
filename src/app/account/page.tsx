import { redirect } from 'next/navigation'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { getCharacters } from '@/lib/services/characterService'

export default async function Account() {
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
    const characters = await getCharacters(user?.id);
    const { data: plotlines, error: e } = await supabase.from("plotline").select("*").eq('user_id', user?.id);
    
    console.log('characters', characters );
    console.log('plotline', plotlines, e);

    
   
   
    return <AccountForm user={user} />
}