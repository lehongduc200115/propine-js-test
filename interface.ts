export interface Balance {
  amount: number,
  concurrencyUnit: string
}

export interface ITokenPorfolio {
  name: string,
  rawAmount: number,
  portfolios: [Balance?],
}

export interface ITransactionRecord {
  timestamp: string,
  transaction_type: string,
  token: TOKEN_NAME,
  amount: string,
}

export interface IResponse {
  [key: TOKEN_NAME]: {
    [key: CONCURRENCY_UNIT]: number
  }
}

export type CONCURRENCY_UNIT = string
export type TOKEN_NAME = string