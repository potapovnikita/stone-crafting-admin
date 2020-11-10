<template lang='pug'>
  div
    textarea(
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
export default {
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
  mounted() {
    const area = document.getElementsByTagName('textarea');
    area[0].addEventListener("input", (i) => {
      i.target.style.height = 'auto';
      i.target.style.height = (i.target.scrollHeight) + 'px';
    }, false);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
textarea
  border-radius 10px
  padding 10px 23px 9px
  color $main_color_blue
  outline none
  cursor pointer
  border 1px solid $main_color_blue
  resize none
  height 200px

  &.error
    border 1px solid $light_red
.errorText
  color $light_red
  font-size 14px




</style>
