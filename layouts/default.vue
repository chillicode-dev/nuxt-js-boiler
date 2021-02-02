<template>
  <div class="layout">
    <Header />
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
  components: {Header},
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - #{$header-height});
}
</style>
