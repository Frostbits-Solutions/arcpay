import { supabase } from '@/lib/supabase/supabaseClient'

export async function getTransactions(app_ids: string[]) {
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .in('app_id', app_ids)
    return { data, error }
}

export async function getTransactionsListings(account_id: number){
  const { data, error } = await supabase
    .from('transactions')
    .select('*, listings!inner( * )')
    .eq('listings.account_id', account_id)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function subscribeToTransactions(account_id: number, callback: ()=>{}) {
    supabase.channel(`transactions_feed`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transactions' },
        (payload) => {
            console.log('Change received!', payload)
        }
      )
      .subscribe()
}
