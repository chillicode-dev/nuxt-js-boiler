<template>
  <div class="header">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
};
</script>

<style lang="scss" scoped>
.header {
  @include on-phone() {
    color: red;
  }
}
</style>
