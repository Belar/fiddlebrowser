<template>
  <div>
    <hero-title>
      <h1 class="title">fiddleBrowser</h1>
      <h2 class="subtitle">jsFiddle profile browser</h2>
    </hero-title>

    <browser></browser>
  </div>
</template>

<script>
import HeroTitle from '~components/HeroTitle';
import Browser from '~components/Browser';

export default {
  components: {
    HeroTitle,
    Browser
  }
}
</script>

<style>
</style>
