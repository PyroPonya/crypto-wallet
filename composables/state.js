export const useWallet = () =>
  useState('wallet', () => {
    const innards = {
      usd: 90000,
      btc: 15,
      eth: 42,
    };
    return innards;
  });

export const useHistoryRates = () =>
  useState('currencyHistoryRates', () => {
    const cryptoNames = {
      btc: 'bitcoin',
      eth: 'ethereum',
    };
    // returns date<string> format 'dd-mm-yyyy'
    const getDateXDaysAgo = (numOfDays, date = new Date()) => {
      const daysAgo = new Date(date.getTime());

      daysAgo.setDate(date.getDate() - numOfDays);

      return `${daysAgo.getDate()}-${daysAgo.getMonth() + 1}-${daysAgo.getFullYear()}`;
    };

    // returns array of days<num> with data for selected currency
    const fetchDate = (coin, days) => {
      const cryptoArr = [];

      for (let i = 0; i <= days; i++) {
        const date = getDateXDaysAgo(i);
        fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoNames[coin]}/history?date=${date}&localization=false`
        )
          .then((response) => response.json())
          .then((result) => cryptoArr.push(result));
      }
      return cryptoArr;
    };
    const getRatesRange = (days = 14) => {
      let historyRate = {};
      for (let el in cryptoNames) {
        historyRate[el] = fetchDate(el, days);
      }
      return historyRate;
    };
    const historyRates = getRatesRange();
    return historyRates;
  });
