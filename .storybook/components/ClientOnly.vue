<template>
  <div class="client-only">
    <template v-if="isInBrowser">
      <slot />
    </template>
    <template v-else-if="placeholder">{{ placeholder }}</template>
  </div>
</template>

<script>
import isInBrowser from 'is-in-browser';

export default {
  name: 'Header',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    isInBrowser() {
      return isInBrowser;
    },
  },
};
</script>

<style lang="scss" scoped>
.client-only {
  display: contents;
}
</style>
