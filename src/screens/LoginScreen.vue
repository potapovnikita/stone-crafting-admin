<template lang='pug'>
  .login_container
    form.login_form(v-on:submit.prevent.enter="authorize()")
      Logo
      h3 Вход
      .form_item__container
        Input(type="text" name="username" placeholder="Логин" v-model.trim="username" :error="errorUsername")
      .form_item__container
        Input(type="password" name="password" placeholder="Пароль" v-model.trim="password" :error="errorPass")

      .form_item__container.error(v-if="serverError") {{serverError}}
      .form_item__container
        Button(type="submit" name="Войти")


</template>

<script>
  import Input from '../components/uiComponents/Input';
  import Button from '../components/uiComponents/Button';
  // import { cookies }  from '../api/api-utils';
  // import { token } from '../api/api'
  import { errorsFields } from '@/constants/constants';
  import { mapState } from 'vuex'


  import Logo from  '../assets/images/logo_with_name.svg'

  export default {
    components: {
      Input,
      Button,
      Logo,
    },
    data() {
      return {
        password: '',
        username: '',
        errorPass: '',
        errorUsername: '',
        loader: false,
      }
    },
    computed: {
      ...mapState(['serverError']),
    },
    methods: {
      authorize() {
        this.loader = true
        this.clearErrors();
        if (!this.username.length) this.errorUsername = errorsFields.empty
        if (!this.password.length) this.errorPass = errorsFields.empty
        if (!this.username.length || !this.password.length) return

        this.$store.dispatch('login', {
          email: this.username,
          password: this.password
        })
      },
      clearErrors() {
        this.errorPass = '';
        this.errorUsername = '';
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .login_container
    min-height 100vh
    display flex
    justify-content center
    flex-direction column
    align-items center
    background-color $lightest_grey

    .login_form
      min-width 400px
      display flex
      flex-direction column
      align-items center
      background-color $white
      padding 30px
      border-radius: 30px
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

      img,
      svg
        width 150px

      h3
        text-align center

      .form_item__container
        .text
          margin-bottom 5px
        .registry_link, a
          cursor pointer
          text-decoration underline
          color $main_color_blue
          &:hover
            text-decoration none


</style>