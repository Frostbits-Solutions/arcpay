<script setup lang="ts">
import { TransactionModal, TRANSACTION_TYPE, CONVENTION_TYPE } from '@/lib/web3'
import { ref } from 'vue'
import { CONTRACT_TYPE } from '@/lib/web3/transactions/constants'

const transactionType = ref(TRANSACTION_TYPE.buy)

const parameters = {
    [TRANSACTION_TYPE.buy]: {
        seller: 'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
        appIndex: 42034631,
        nftAppID: 29105406,
        price: 1,
        feesAddress: 'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
        nftID: 602,
    },
    [TRANSACTION_TYPE.bid]: {
      seller: 'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
      appIndex: 42034657,
      nftAppID: 29105406,
      minPrice: 1,
      feesAddress: 'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
      nftID: 685,
    },
    [TRANSACTION_TYPE.cancel]: {
        seller: 'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
        appIndex: 40427317,
        nftAppID: 29105406,
    },
    [TRANSACTION_TYPE.create]: {
        nftAppID: 29105406,
        nftID: 685,
        feesAddress:
            'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
    },
    [TRANSACTION_TYPE.update]: {
        appIndex: 40427317,
        feesAddress:
            'UVGMQYP246NIXHWFSLBNPFVXJ77HSXNLU3AFP3JQEUVJSTGZIMGJ3JFFZY',
    },
}
</script>

<template>
    <main>
        <TransactionModal
            :transactionType="transactionType"
            :conventionType="CONVENTION_TYPE.VoiARC72"
            :contractType="CONTRACT_TYPE.Auction"
            :parameters="parameters[transactionType]"
        />

        <p>Test contract:</p>
        <select v-model="transactionType">
          <option :value="TRANSACTION_TYPE.buy">buy</option>
          <option :value="TRANSACTION_TYPE.bid">bid</option>
          <option :value="TRANSACTION_TYPE.create">create</option>
          <option :value="TRANSACTION_TYPE.cancel">cancel</option>
          <option :value="TRANSACTION_TYPE.update">update</option>
        </select>
    </main>
</template>

<style scoped>
main {
    text-align: center;
}
</style>