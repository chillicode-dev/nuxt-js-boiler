<template>
  <header class="header">
    <img v-show="!hideLogo" class="logo" src="/assets/icons/test-logo.svg" alt="Logo" />
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    hideLogo: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg-inverted-color;
  min-height: $header-height;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
}
</style>
