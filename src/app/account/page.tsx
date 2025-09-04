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

    return <AccountForm user={user} />
}