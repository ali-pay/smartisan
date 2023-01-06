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
      type: [Number, String],
      default: null,
    },
  },
};
</script>
