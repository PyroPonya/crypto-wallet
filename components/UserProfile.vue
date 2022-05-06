<template>
  <div class="profile" @contextmenu.prevent="logger">
    <div class="wallet">
      <div class="wallet__currency">
        <span class="currency__item">Wallet:</span>
        <div v-for="(el, id) in wallet" :key="id" class="wallet__item">
          {{ id }}:&nbsp;{{ el }}
        </div>
      </div>
      <div class="wallet__adder">
        <div class="adder__element">
          <span>to:&nbsp;</span>
          <select v-model="selectedTo" class="switchTo">
            <option v-for="(el, index) in selectArr" :key="index" :value="el">
              {{ el }}
            </option>
          </select>
        </div>
        <div class="adder__element">
          <span>quantity:&nbsp;</span>
          <input v-model="addValue" type="num" placeholder="enter quantity" />
        </div>
        <div
          class="adder__element adder__btn"
          v-if="selectedTo !== '' && addValue"
          @click="addCurency"
        >
          Add
        </div>
        <div class="adder__element adder__btn-disabled" v-else>
          please fill the fields
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const wallet = useWallet(); // users currency
const historyRates = useHistoryRates(); // hystory data for used currency
const selectedTo = ref('');
const addValue = ref('');
const selectArr = ['usd', 'btc', 'eth'];

// adds currency to wallet
const addCurency = () => {
  if (selectedTo !== '' && addValue.value > 0) {
    console.log(wallet);
    console.log(wallet.value);
    console.log(selectedTo);
    console.log(wallet.value[selectedTo.value]);
    wallet.value[selectedTo.value] = (
      parseFloat(wallet.value[selectedTo.value]) + parseFloat(addValue.value)
    ).toFixed(2);
  } else {
    return null;
  }
  selectedTo.value = '';
  addValue.value = '';
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
  .wallet
    padding: 10px 15px
    border: 1px solid $color2
    background-color: $color2
    border-radius: 8px
    width: 100%
    min-height: 100px
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    align-items: center
    &__currency
      display: grid
      grid-template-rows: 1fr 1fr 1fr 1fr
      justify-items: start
      justify-content: center
      grid-gap: 5px
      .currency__item
        @include flex(row, center, space-between, 0)
        min-width: 100px
        height: 30px
    &__adder
      display: grid
      grid-template-rows: 1fr 1fr 1fr 1fr
      justify-items: start
      justify-content: center
      grid-gap: 5px
      .adder__element
        @include flex(row, center, space-between, 0)
        width: 100%
        input, select
          width: 100px
          height: 30px
      .adder__btn
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
          @extend .adder__btn
          opacity: 0.5
</style>
