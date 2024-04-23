import type { BoxReference, SuggestedParams } from 'algosdk'
import type { Expand, RenameProperties } from 'algosdk/src/types/utils'
import type { AppCreateTxn, MustHaveSuggestedParams } from 'algosdk/src/types/transactions'
import { TransactionType } from 'algosdk/src/types/transactions'
import { OnApplicationComplete } from 'algosdk'

export interface BuyTransactionParameters {
  seller: string,
  appIndex: number,
  nftAppID: number,
  nftID: number,
  price: number,
  feesAddress: string,
}

export interface BuyWArc200TransactionParameters extends BuyTransactionParameters {
  arc200AppID: number,
}

export interface CancelTransactionParameters {
  seller: string,
  appIndex: number,
  nftAppID: number,
}

export interface CreateTransactionParameters {
  nftAppID: number,
  nftID: number,
  feesAddress: string
}

export interface UpdateTransactionParameters {
  appIndex: number,
  feesAddress: string,
}

export type TransactionParameters =
  BuyTransactionParameters |
  CancelTransactionParameters |
  CreateTransactionParameters |
  UpdateTransactionParameters

export type PaymentObject = {
  type: TransactionType; // TransactionType.pay
  from: string;
  note?: Uint8Array | undefined;
  suggestedParams: SuggestedParams;
  to: string;
  amount: number | bigint;
  closeRemainderTo?: string | undefined;
  rekeyTo?: string | undefined; }

export type TransfertObject = {
  type: TransactionType; // TransactionType.axfer
  from: string;
  suggestedParams: SuggestedParams;
  to: string;
  amount: number | bigint;
  note?: Uint8Array | undefined;
  closeRemainderTo?: string | undefined;
  rekeyTo?: string | undefined;
  assetIndex: number;
  revocationTarget?: string | undefined;
}

export type AppCallObject = {
  type: TransactionType; // TransactionType.appl
  from: string;
  suggestedParams: SuggestedParams;
  appIndex: number;
  onComplete: OnApplicationComplete;
  appArgs?: Uint8Array[];
  accounts?: string[];
  foreignApps?: number[];
  foreignAssets?: number[];
  boxes?: BoxReference[];
  lease?: Uint8Array;
  rekeyTo?: string;
  note?: Uint8Array | undefined;
  extraPages?: number;
}

export type AppCreateObject =
  {
    type: TransactionType, // TransactionType.appl
    from: string;
    suggestedParams: SuggestedParams;
    onComplete: OnApplicationComplete;
    numLocalInts: number;
    numLocalByteSlices: number;
    numGlobalInts: number;
    numGlobalByteSlices: number;
    approvalProgram: Uint8Array;
    clearProgram: Uint8Array;
    note?: Uint8Array | undefined;
    appArgs?: Uint8Array[];
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: BoxReference[];
    lease?: Uint8Array;
    rekeyTo?: string;
    extraPages?: number;
  }

export type AppDeleteObject =
{
  type: TransactionType; // TransactionType.appl
  from: string;
  appIndex: number;
  suggestedParams: SuggestedParams;
  onComplete: OnApplicationComplete;
  note?: Uint8Array | undefined;
  appArgs?: Uint8Array[];
  accounts?: string[];
  foreignApps?: number[];
  foreignAssets?: number[];
  boxes?: BoxReference[];
  lease?: Uint8Array;
  rekeyTo?: string;
}

export type AppObject = AppCallObject | AppCreateObject | AppDeleteObject
export type TransactionObject = AppCallObject|AppCreateObject|PaymentObject|TransfertObject
