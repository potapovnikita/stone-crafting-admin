<template lang='pug'>
  .popup
    .content
      .confirm_popup
        .popup_container
          .close_icon(@click="(e) => {e.stopPropagation(); onClose()}")
            XIcon
          .title_container
            .popup_icon(v-if="iconType === 'warning'")
              AlertCircleIcon
            h4.popup_title {{title}}

          p.popup_text(v-if="text") {{text}}
          .popup_button_container
            Button(name="Удалить" :onClick="() => confirmFunc()")
            a.popup_cancel_link(@click="onClose()") Отменить

          .popup_error(v-if="error") {{error}}
        .popup_overlay

</template>

<script>
import { XIcon, AlertCircleIcon } from 'vue-feather-icons';
import Button from './Button';


export default {
  props: {
    onClose: Function,
    confirmFunc: Function,
    iconType: String,
    title: String,
    text: String,
    error: String,
  },
  components: {
    Button,
    XIcon,
    AlertCircleIcon,
  },
  computed: {

  },
}
</script>

<style lang="stylus" scoped>

.confirm_popup
  .popup_overlay
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 1000;
    position: fixed;
    opacity: 1;

  .popup_container
    background-color white
    z-index 1001
    position fixed
    top 0
    left calc(50% - 210px)
    width 420px
    border-bottom-left-radius 8px
    border-bottom-right-radius 8px
    padding 35px 25px
    box-shadow: 0 4px 8px -2px rgba(130, 136, 148, 0.59), 0 0 2px 0 rgba(130, 136, 148, 0.39);

    @media only screen and (max-width 767px)
      width 100%
      top 0
      left 0
      right 0
      overflow-y scroll

    .title_container
      display flex
      flex-direction row
      flex-wrap nowrap
      align-items flex-start

      .popup_icon
        margin-top 16px
        margin-bottom 20px
        margin-right 20px

        svg
          width 40px
          height 40px
          stroke $light_red

      h4.popup_title
        font-size: 15px;
        font-weight: 600;
        font-style: normal;
        margin-bottom 15px

    p.popup_text
      opacity 0.75
      font-size 13px
      margin-bottom 25px

    .popup_button_container
      display: flex;
      align-items: center;
      button
        margin-right 17px
      .popup_cancel_link
        color #8e96a0
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        cursor pointer
        &:hover
          color black
          text-decoration underline
    .popup_error
      color $light_red
      font-size 13px
      margin-top 10px

    .close_icon
      cursor pointer
      opacity 0.5
      transition all 0.3s linear
      position: absolute;
      right 20px
      top 20px
      &:hover
        transform rotate(90deg)
        opacity 1



</style>
