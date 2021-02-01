<template>
  <div class="header">
    <TestIcon />
    <slot />
  </div>
</template>

<script>
import TestIcon from '@/static/assets/icons/test-icon.svg';

export default {
  name: 'Header',
  components: {TestIcon},
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
