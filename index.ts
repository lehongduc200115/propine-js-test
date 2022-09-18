// Write your answer here
import csv from "csv-parser";
import fetch from "node-fetch";
import * as fs from "fs";
import { IResponse, ITokenPorfolio, ITransactionRecord, TOKEN_NAME } from './interface';
import constant from './constant';
import yargs from 'yargs';

const transactions: [ITransactionRecord?] = [];

let argv = yargs.argv;
const concurrencyUnit = argv?.concurrencyUnit?.split(',') || ['USD']
const tokensPorfolio: [ITokenPorfolio?] = [];

fs.createReadStream(constant.PATH)
  .pipe(csv())
  .on("data", (data) => transactions.push(data))
  .on("end", async () => {
    transactions.forEach((record) => {
      if (!tokensPorfolio.some(token => token.name === record.token)) {
        tokensPorfolio.push({
          name: record.token,
          rawAmount: 0,
          portfolios: []
        });
      }

      const token = tokensPorfolio.find(token => token.name == record.token);
      let amount = parseFloat(record.amount);
      if (record.transaction_type === constant.WITHDRAWAL) {
        token.rawAmount -= amount;
      } else if (record.transaction_type === constant.DEPOSIT) {
        token.rawAmount += amount;
      }
    });

    const tokenNames: TOKEN_NAME[] = tokensPorfolio.map(tokenPorfolio => tokenPorfolio.name)
    const response = await fetch(constant.EXCHANGE_API(tokenNames, concurrencyUnit));
    const res: IResponse = await response.json();
    
    tokensPorfolio.forEach(token => {
      for (let unit in res[token.name]) {
        token.portfolios.push({
          amount: token.rawAmount * res[token.name][unit],
          concurrencyUnit: unit
        })
      }
    })

    console.dir(tokensPorfolio, {depth: null});
  });
