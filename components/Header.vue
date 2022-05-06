<template>
  <div class="header">
    <NuxtLink to="/" class="header__link">Charts</NuxtLink>
    <NuxtLink to="/profile" class="header__link">Profile</NuxtLink>
    <span class="header__title">CryptoWallet</span>
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
@import './assets/variables'
@import './assets/mixins'
.header
  @include flex(row, center, flex-start, 15px)
  min-height: 50px
  width: 100vw
  padding: 0.5% 2.5%
  background-color: $color1
  .header__title
    font-size: $fontSizeBig
    margin: 0 5%
    color: $color5
    text-shadow: $color4 -3px 3px 6px
    @media screen and (max-width: 500px)
      font-size: $fontSizeMedium
  .header__link
    color: $color5
    padding: 10px
    border: 1px solid $color5
    border-radius: 8px
    transition: all 0.2s ease-out
    font-size: $fontSizeMedium
    &:hover
      color: $color3
      border-color: $color3
      background-color: $color5
      box-shadow: -6px 3px 3px $color4
    &:active
      transform: translate(-6%, 6%)
      box-shadow: -1px 1px 3px $color4
</style>
