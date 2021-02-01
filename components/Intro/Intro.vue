<template>
  <div class="intro">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: {},
};
</script>

<style lang="scss" scoped>
.intro {
  width: 100%;
  min-height: 400px;
  background-image: url('#{$static-path}/assets/images/test-img.png');
}
</style>
