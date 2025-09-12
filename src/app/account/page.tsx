import { redirect } from 'next/navigation'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

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
      const { data } = await supabase.from("character").select("*").eq('user_id', user?.id);
    
    console.log('character', data);
   
   
    

    return <AccountForm user={user} />
}