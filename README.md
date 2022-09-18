## Submission
_We're looking at your programming ability. It must not only work, it should be maintainable._

To run the program:

```
npm run start -- --concurrencyUnit=EUR,USD
```
**--concurencyUnit** is optional, **seperated** by **comma**, USD is default.

On running, the portfolios return as this **interface**:
```javascript
[{ "name": BTC|ETH|XRP, "rawAmount": number, portfolios: [{"amount": number, "concurrencyUnit": 'USD'}] }]
```

Concretely:
 - name: token's name
 - rawAmount: total amount of that token (units)
 - portfolios:
    - amount: The amount in specify concurrencyUnit
    - concurrencyUnit: 'USD' || 'EUR' || ....

This way of structuring the output helps us a lot in maintaining code as well as in extend our program, .i.e convert to others concurrency unit.
