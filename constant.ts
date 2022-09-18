export default {
  WITHDRAWAL: "WITHDRAWAL",
  DEPOSIT: "DEPOSIT",
  PATH: "data/transactions.csv",
  EXCHANGE_API: (tokens, currencyUnits) => `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokens.join(',')}&tsyms=${currencyUnits.join(',')}`,
}
