<template>
  <div class="profile" @contextmenu.prevent="logger">
    <div class="exchange">
      <div class="exchange__wallet">
        <span class="wallet__item">Wallet:</span>
        <div v-for="(el, id) in wallet" :key="id" class="wallet__item">
          {{ id }}:&nbsp;{{ el }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const wallet = useWallet(); // users currency
const historyRates = useHistoryRates(); // hystory data for used currency
const selectArr = ['usd', 'btc', 'eth'];
// ======= LOGGER =======
const logger = () => {
  console.log(historyRates.value);
  console.log(historyRates.value.btc);
  console.log(
    parseFloat(historyRates.value.btc[0].market_data.current_price.usd.toFixed(2))
  );
  console.log(historyRates.value.eth);
  console.log(
    parseFloat(historyRates.value.eth[0].market_data.current_price.usd.toFixed(2))
  );
};
</script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'
.profile
  @include flex(column, center, flex-start, 15px)
  min-height: 90vh
  width: 100vw
  padding: 1% 3%
  background-color: $color1
  .profile__element
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
</style>
