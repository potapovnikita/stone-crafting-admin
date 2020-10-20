<template lang='pug'>
  div
    input(
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :class="{'error': error}"
      :style="{'width': width || '100%'}"
    )
    .errorText(v-if="error") {{error}}

</template>

<script>
  const Input = {
    name: 'Input',
    components: { },
    props: {
      name: String,
      type: String,
      placeholder: String,
      value: String,
      error: String,
      width: String,
    },
    methods: {

    },
    created() {
    }
  }

  export default Input
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  input
    border-radius 10px
    padding 10px 23px 9px
    color $main_color_blue
    outline none
    cursor pointer
    border 1px solid $main_color_blue

    &.error
      border 1px solid $light_red
  .errorText
    color $light_red
    font-size 14px




</style>
