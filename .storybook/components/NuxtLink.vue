<template>
  <a :href="to" :class="classes"><slot /></a>
</template>

<script>
export default {
  name: 'Header',
  props: {
    to: {
      type: String,
      required: true,
    },
    linkActiveClass: {
      type: String,
      default: '',
    },
    linkExactActiveClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return {
        [this.linkActiveClass]: this.linkActiveClass,
        [this.linkExactActiveClass]: this.linkExactActiveClass,
      };
    },
  },
};
</script>
