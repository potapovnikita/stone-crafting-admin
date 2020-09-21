<template lang='pug'>
  div
    .select-container
      .select(@click="isOpen= !isOpen" :class="{'opened': isOpen}")
        .values(v-if="isMulti && selected && selected.length")
          .item(v-for="option in selected")
            | {{option.name}}
            .icon.delete(@click="(e) => removeOption(option)")
              XIcon
        .value(v-else-if="!isMulti && selected") {{selected.name}}
        .placeholder(v-else) {{placeholder}}

        .arrow
          ChevronDownIcon(v-if="!isOpen")
          ChevronUpIcon(v-else)
      .options(v-if="isOpen" v-click-outside="open")
        .option(v-for="option in optionsFilter" @click="selectOption(option)" :class="{'selected': isSelected(option)}")
          .name {{option.name}}
    .errorText(v-if="error") {{error}}

</template>

<script>
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'vue-feather-icons'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Select',
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    XIcon,
  },
  data() {
    return {
      isOpen: false,
      selected: this.value,
    }
  },
  props: {
    isMulti: Boolean,
    placeholder: String,
    value: Object | Array,
    error: String,
    width: String,
    options: Array,
  },
  methods: {
    // getSelected() {
    //   return
    // },
    removeOption(option) {
      this.selected = this.selected.filter(i => i.id !== option.id)
    },
    isSelected(option) {
      if (this.selected) {
        if (this.isMulti) return this.selected.find((item) => item.id === option.id)
        return this.selected.id === option.id
      }
      return false;

    },
    open() {
      if (this.isOpen) this.isOpen= !this.isOpen
    },
    selectOption(option) {
      if (this.isMulti) {
        this.selected.push(option)
      } else {
        this.selected = option;
        this.isOpen = false;
      }

      this.$emit('update:value', this.selected)
    }
  },
  computed: {
    optionsFilter() {
      return this.options
    }
  },
  mounted() {
    this.popupItem = this.$el
    // this.$emit('update:value', this.selected)
  },
  created() {
  },
  directives: {
    ClickOutside
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.select-container
  position relative
  .select
    border-radius 10px
    padding 10px 23px 9px
    color $main_color_blue
    outline none
    cursor pointer
    border 1px solid $main_color_blue
    position relative
    z-index 1

    .placeholder
      color rgb(117, 117, 117);
    .values
      display flex
      flex-wrap wrap
      padding-right 10px
      .item
        display inline-flex
        align-items center
        margin 0 3px
        font-size 14px
        .delete.icon
          cursor pointer
          display flex
          svg
            width 18px !important
            height 18px !important


    //&.opened
    //  border-bottom-left-radius 0
    //  border-bottom-right-radius 0

    .arrow
      position absolute
      right 15px
      top 6px


  .options
    position absolute
    width 100%
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    border 1px solid $main_color_blue
    border-radius 10px
    z-index 2


    .option
      padding 10px 23px 9px
      color $main_color_blue
      outline none
      cursor pointer
      background-color white
      &.selected
        pointer-events none
        .name
          opacity 0.5
      &:nth-child(odd)
        background-color $lightest_grey
      &:first-child
        border-top-left-radius 10px
        border-top-right-radius 10px
      &:last-child
        border-bottom-left-radius 10px
        border-bottom-right-radius 10px

      &:hover
        background-color $light_grey


    &.error
      border 1px solid $light_red
  .errorText
    color $light_red
    font-size 14px




</style>
