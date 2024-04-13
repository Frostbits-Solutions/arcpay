import {
  WalletConnectModalSign
} from '@walletconnect/modal-sign-html'
import type {
  WalletConnectModalSignOptions,
  WalletConnectModalSignSession } from '@walletconnect/modal-sign-html'

import _algosdk, { assignGroupID, Transaction } from 'algosdk'
import BaseClient from '@/lib/web3/wallets/base'
import { DEFAULT_NETWORK, GEMS_PAY_METADA, PROVIDER_ID } from '@/lib/web3/constants'
import { ALGORAND_CHAINS, ICON } from './constants'
import type { WalletProvider } from '../../types'
import { base64ToBytes, bytesToBase64 } from '@agoralabs-sh/algorand-provider'
import { formatJsonRpcRequest } from '@/lib/web3/wallets/walletConnect/utils'
import Algod from '@/lib/web3/algod'

class WalletConnect extends BaseClient {
  #client: WalletConnectModalSign
  metadata: WalletProvider
  chain: string

  static async init () {
    const algoD = await Algod.init()
    return new WalletConnect(algoD.algosdk, algoD.algodClient)
  }
  constructor(
    algosdk: typeof _algosdk,
    algodClient: _algosdk.Algodv2
  ) {
    super(algosdk, algodClient)
    this.#client = new WalletConnectModalSign(  {
        projectId: 'c9e0989a78ab0eda6ef031f0954475ff',
        metadata: GEMS_PAY_METADA
      })
    this.metadata = {
      id: PROVIDER_ID.WALLETCONNECT,
      name: PROVIDER_ID.WALLETCONNECT.toUpperCase(),
      icon: ICON,
      isWalletConnect: false,
    }
    // @ts-ignore
    this.chain = ALGORAND_CHAINS[DEFAULT_NETWORK]
  }


  async connect(onDisconnect: () => void, args?: any) {
    const requiredNamespaces = {
      algorand: {
        chains: ['algorand:testnet'],
        methods: ['algo_signTxn'],
        events: []
      }
    }

    const session = await this.#client.connect({
      requiredNamespaces
    })
    const { accounts } = session.namespaces.algorand
    console.log(accounts)
    return {
      ...this.metadata,
      accounts: this.#mapAccounts(accounts)
    }
  }

  async disconnect() {
    try {
      const session = await this.#getSession()

      await this.#client.disconnect({
        topic: session.topic,
        // replicates getSdkError('USER_DISCONNECTED') from @walletconnect/utils
        reason: {
          message: 'User disconnected.',
          code: 6000
        }
      })
    } catch (error) {
      console.error('Error disconnecting', error)
    }
  }

  async reconnect(onDisconnect: () => void) {
    const session: WalletConnectModalSignSession | undefined = await this.#client.getSession()
    if (typeof session === 'undefined') {
      return null
    }

    const { accounts } = session.namespaces.algorand
    console.log(accounts)
    return {
      ...this.metadata,
      accounts: this.#mapAccounts(accounts)
    }
  }

  async signTransactions(transactions: Transaction[], isAtomicTransactions: Boolean) {
    if (isAtomicTransactions) {
      assignGroupID(transactions);
    }

    const txns = []
    for (const transaction of transactions){
      txns.push({
        txn: bytesToBase64(transaction.toByte())
        //signers: [], // an empty array instructs the wallet to skip signing this transaction
      })
    }

    const request = formatJsonRpcRequest('algo_signTxn', [txns])

    const session = await this.#getSession()

    const response = await this.#client.request<Array<string | null>>({
      chainId: this.chain,
      topic: session.topic,
      request
    })
    console.log(response)

    let signedTransactionBytes: Uint8Array[] = []
    for (let stxn of response) {
      if (typeof stxn === 'string'){
        signedTransactionBytes.push(base64ToBytes(stxn))
      }
    }

    return signedTransactionBytes
  }

  async #getSession() {
    const session: WalletConnectModalSignSession | undefined = await this.#client.getSession()
    if (typeof session === 'undefined') {
      throw new Error('Session is not connected')
    }
    return session
  }

  #mapAccounts(accounts: string[]) {
    return accounts.map((accountStr, index) => ({
      name: `WalletConnect ${index + 1}`,
      address: accountStr.split(':').pop() as string,
      providerId: PROVIDER_ID.WALLETCONNECT
    }))
  }
}

export default WalletConnect
