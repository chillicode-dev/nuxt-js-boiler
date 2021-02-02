<template>
  <div class="index-page">
    <div class="container">
      <div class="icon-wrapper">
        <TestIcon />
      </div>
      <h1 class="title">Chillicode Nuxt.js Boilerplate</h1>
      <div class="links-wrapper">
        <a href="https://github.com/chillicode-dev/nuxt-js-boiler" target="_blank">Boilerplate Docs</a>
        <a href="https://nuxtjs.org/docs/2.x/get-started/installation" target="_blank">Nuxt.js Docs</a>
        <a href="https://storybook.js.org/docs/react/get-started/introduction" target="_blank">Storybook Docs</a>
      </div>
    </div>
  </div>
</template>

<script>
import TestIcon from '@/static/assets/icons/test-icon.svg';

export default {
  components: {TestIcon},
};
</script>

<style lang="scss" scoped>
.index-page {
  padding: 150px;
  text-align: center;
}

.container {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 660px;
}

.title {
  font-size: 48px;
}

.links-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
</style>
