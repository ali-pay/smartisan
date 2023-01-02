<template>
  <div class="sm-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SmRadioGroup',
  props: {
    value: {
      type: String,
      default: null,
    },
  },
};
</script>
