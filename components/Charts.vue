<template>
  <div class="charts" @contextmenu.prevent="logger">
    <div class="charts__info charts__element">
      <span class="info__name">name</span>
      <span class="info__id">id</span>
      <span class="info__rate">rate/1pc</span>
      <span class="info__chart">chart</span>
    </div>
    <div v-for="(item, id) in currentRates" :key="id" class="charts__element">
      <span class="element__name borderLR">{{ item.name }}</span>
      <span class="element__id borderLR">{{ item.symbol }}</span>
      <span class="element__rate borderLR">${{ item.current_price }}</span>
      <span class="element__chart borderLR"
        >chart for {{ historyRates[item.symbol].length }} days</span
      >
    </div>
    <div class="exchange">
      <div class="exchange__wallet">
        <span class="wallet__item">Wallet:</span>
        <div v-for="(el, id) in wallet" :key="id" class="wallet__item">
          {{ id }}:&nbsp;{{ el }}
        </div>
      </div>
      <div class="exchange__switcher">
        <div class="switcher__element">
          <span>from:&nbsp;</span>
          <select v-model="selectedFrom" class="switchFrom">
            <option v-for="(el, index) in selectArr" :key="index" :value="el">
              {{ el }}
            </option>
          </select>
        </div>
        <div class="switcher__element">
          <span>to:&nbsp;</span>
          <select v-model="selectedTo" class="switchTo">
            <option v-for="(el, index) in selectArr" :key="index" :value="el">
              {{ el }}
            </option>
          </select>
        </div>
        <div class="switcher__element">
          <span>quantity:&nbsp;</span>
          <input v-model="switchValue" type="num" placeholder="enter quantity" />
        </div>
        <div
          class="switcher__element switcher__btn"
          v-if="selectedFrom !== '' && selectedTo !== '' && switchValue"
          @click="currExchange"
        >
          trade
        </div>
        <div class="switcher__element switcher__btn-disabled" v-else>
          please fill the fields
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const wallet = useWallet(); // users currency
const historyRates = useHistoryRates(); // hystory data for used currency
let selectedFrom = ref('');
let selectedTo = ref('');
let switchValue = ref('');
const selectArr = ['usd', 'btc', 'eth'];
const cryptoNames = {
  btc: 'bitcoin',
  eth: 'ethereum',
};
const tempHolder = {};
const createChartsData = () => {
  for (let i in historyRates.value) {
    let tempArr = [];
    for (let j = 0; j < historyRates.value[i].length; j++) {
      // console.log(historyRates.value[i][j].market_data.current_price.usd.toFixed(2));
      tempArr.push(historyRates.value[i][j].market_data.current_price.usd.toFixed(2));
    }
    tempHolder[`${i}`] = tempArr;
    console.log('i');
    console.log(i);
    console.log('tempArr');
    console.log(tempArr);
    console.log('tempHolder');
    console.log(tempHolder);
  }
};
createChartsData();
// ======= LOGGER =======
// const logger = () => {
//   console.log(historyRates.value);
//   console.log(historyRates.value.btc);
//   console.log(
//     parseFloat(historyRates.value.btc[0].market_data.current_price.usd.toFixed(2))
//   );
//   console.log(historyRates.value.eth);
//   console.log(
//     parseFloat(historyRates.value.eth[0].market_data.current_price.usd.toFixed(2))
//   );
// };

// turning one currency into another
const currExchange = () => {
  let priceFrom = 0;
  // set price to 1 if converting from usd
  if (selectedFrom.value == 'usd') {
    priceFrom = 1;
  } else {
    const filterFrom = currentRates.filter((el) => el.symbol == selectedFrom.value);
    priceFrom = filterFrom[0].current_price;
  }

  let priceTo = 0;
  // set price to 1 if converting to usd
  if (selectedTo.value == 'usd') {
    priceTo = 1;
  } else {
    const filterTo = currentRates.filter((el) => el.symbol == selectedTo.value);
    priceTo = filterTo[0].current_price;
  }
  const quantity = switchValue.value;
  const income = ((parseFloat(quantity) * priceFrom) / priceTo).toFixed(2);
  if (
    (parseFloat(wallet.value[selectedFrom.value]) - parseFloat(quantity)).toFixed(2) >= 0
  ) {
    wallet.value[selectedFrom.value] = (
      parseFloat(wallet.value[selectedFrom.value]) - parseFloat(quantity)
    ).toFixed(2);
    wallet.value[selectedTo.value] = (
      parseFloat(wallet.value[selectedTo.value]) + parseFloat(income)
    ).toFixed(2);
  } else {
    console.warn(new Error('insufficient funds'));
    return null;
  }
  selectedFrom.value = '';
  selectedTo.value = '';
  switchValue.value = '';
};

// object with crypto rates
const currentRates = [];
for (let el in cryptoNames) {
  const { data: rate } = await useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoNames[el]}`
  );
  currentRates.push(rate.value[0]);
}
</script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'
.charts
  @include flex(column, center, flex-start, 15px)
  min-height: 90vh
  width: 100vw
  padding: 1% 3%
  background-color: $color1
  .charts__element
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    align-items: center
    padding: 5px 15px
    border: 1px solid $color2
    border-radius: 8px
    width: 100%
    min-height: 50px
    .borderLR
      border-left: 1px solid $color2
      border-right: 1px solid $color2
      &:first-child
        border-left: none
      &:last-child
        border-right: none
  .charts__info
    background-color: $color2
  .exchange
    padding: 10px 15px
    border: 1px solid $color2
    background-color: $color2
    border-radius: 8px
    width: 100%
    min-height: 100px
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    align-items: center
    &__wallet
      display: grid
      grid-template-rows: 1fr 1fr 1fr 1fr
      justify-items: start
      justify-content: center
      grid-gap: 5px
      .wallet__item
        @include flex(row, center, space-between, 0)
        min-width: 100px
        height: 30px
    &__switcher
      display: grid
      grid-template-rows: 1fr 1fr 1fr 1fr
      justify-items: start
      justify-content: center
      grid-gap: 5px
      .switcher__element
        @include flex(row, center, space-between, 0)
        width: 100%
        input, select
          width: 100px
          height: 30px
      .switcher__btn
        background-color: $color1
        border: 1px solid $color5
        border-radius: 8px
        transition: all 0.2s ease-out
        padding: 5px
        cursor: pointer
        @include flex(row, center, center, 0)
        &:hover
          color: $color3
          border-color: $color3
          background-color: $color5
          box-shadow: -4px 3px 3px $color4
        &:active
          transform: translate(-3%, 3%)
          box-shadow: -1px 1px 3px $color4
        &-disabled
          @extend .switcher__btn
          opacity: 0.5
</style>
