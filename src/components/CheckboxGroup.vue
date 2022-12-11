<template>
  <div class="sm-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SmCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: null,
    },
  },
};
</script>
