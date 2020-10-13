<template lang='pug'>
  .checkbox_container
    input(
      type="checkbox"
      :name="name"
      :value="value"
      v-model="model"
      :class="{'error': error}"
    )
    label {{name}}
    .errorText(v-if="error") {{error}}

</template>

<script>

const Checkbox = {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  props: {
    name: String,
    checked: Array,
    value: Object,
    error: String,
    width: String,
  },
}

export default Checkbox
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.checkbox_container
  display flex
  align-items center
  flex-direction row
  margin-bottom 8px

  input
    border-radius 10px
    padding 10px 23px 9px
    color $main_color_blue
    outline none
    cursor pointer
    border 1px solid $main_color_blue
    width 20px
    height 20px
    margin-right 10px

    &.error
      border 1px solid $light_red
  .errorText
    color $light_red
    font-size 14px




</style>
