<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { Client } from 'arcpay-sdk'
import type { QueryData } from '@supabase/supabase-js'
import TransactionCard from '@/components/dashboard/TransactionCard.vue'
import type { Database } from '@/lib/supabase/database.types'
import { supabase } from '@/lib/supabase/supabaseClient'
import ListingCard from '@/components/dashboard/ListingCard.vue'

const transactions = ref<Database["public"]["Tables"]["transactions"]["Row"][]>([])
const listings = ref<QueryData<any> | null>(null)
const arcpay = new Client({apiKey: 'acc8f88c-c155-44a7-b382-2ab6f3f21970'})

function formatDate(date: string) {
  const d = new Date(date)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

async function fetchTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
  if (data) {
    transactions.value = data
  } else {
    console.log(error)
  }
}

onMounted(() => {
  nextTick(async () => {
    await fetchTransactions()
    const { data, error } = await arcpay.getListings()
    if (data) {
      listings.value = data
    } else {
      console.log(error)
    }
  })
})
</script>

<template>
  <main class="min-h-dvh pl-16 pt-16">
    <div class="max-w-screen-xl mx-auto p-10">
      <div class="flex items-center justify-between">
        <h4 class="text-2xl font-bold dark:text-white">Test SDK</h4>
        <button @click="arcpay.createListing()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create listing</button>
      </div>
      <div class="mt-12 w-full rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
          Organization listings
        </h2>
        <ul class="mt-10">
          <li v-for="(listing, index) in listings" :key="listing.id">
            <ListingCard :listing="listing" :style="`animation-delay: ${index * 100}ms; animation-fill-mode: both`"/>
          </li>
          <li v-if="!listings?.length">
            <span class="flex justify-start items-center py-4 mb-5 border border-gray-100 text-gray-700 dark:text-gray-100 rounded-lg hover:shadow-lg dark:hover:bg-gray-700 animate-slide-in-bottom dark:border-gray-700">
              <div class="max-w-80 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Id</div>
                <div class="w-72 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-32 px-5 border-l border-gray-100">
                <div class="w-12 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
              </div>
              <div class="w-24 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Type</div>
                <div class="w-12 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-28 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">App id</div>
                <div class="w-16 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-40 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Asset id</div>
                <div class="w-32 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-28 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Asset type</div>
                <div class="w-16 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="max-w-64 border-l px-5 border-gray-100 text-sm grow dark:border-gray-700">
                <div class="text-gray-400 text-xs">Name</div>
                <div class="w-42 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div class="mt-12 w-full rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
          All transactions
        </h2>
        <ul class="mt-10">
          <li v-for="(transaction, index) in transactions" :key="transaction.id" class="text-left">
            <span class="pl-2 text-xs text-gray-400 dark:text-gray-600">{{ formatDate(transaction.created_at) }}</span>
            <TransactionCard :transaction="transaction" :style="`animation-delay: ${index * 100}ms; animation-fill-mode: both`"/>
          </li>
          <li v-if="!transactions?.length">
            <span class="flex justify-start items-center py-4 mb-5 border border-gray-100 text-gray-700 dark:text-gray-100 rounded-lg hover:shadow-lg dark:hover:bg-gray-700 animate-slide-in-bottom dark:border-gray-700">
              <div class="max-w-80 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Tx id</div>
                <div class="w-72 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-28 px-5 border-l border-gray-100">
                <div class="w-12 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
              </div>
              <div class="max-w-80 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">From</div>
                <div class="w-72 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="w-28 border-l border-gray-100 px-5 text-sm dark:border-gray-700">
                <div class="text-gray-400 text-xs">Amount</div>
                <div class="w-12 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="max-w-64 border-l px-5 border-gray-100 text-sm grow dark:border-gray-700">
                <div class="text-gray-400 text-xs">Listing</div>
                <div class="w-42 h-3 my-0.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
    text-align: center;
}
</style>
