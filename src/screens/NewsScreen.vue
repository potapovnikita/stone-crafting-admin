<template lang='pug'>
  .container
    h1 Администрирование сайта
      a(href="https://www.stone-crafting.com" target="_blank" title="Перейти на сайт") stone-crafting.com

    .titles
      h2(:class="{'active' : section === 'goods'}" @click="setSection('goods')") Товары
      h2(:class="{'active' : section === 'categories'}" @click="setSection('categories')") Категории

    .section(v-if="section === 'categories'")
      .add_category
        .form_item__container
          Input(name="category" placeholder="Название категории" v-model.trim="newCategory" :error="newCategoryErr")
        .form_item__container
          Input(name="categoryEng" placeholder="Название категории на Англ" v-model.trim="newCategoryEng" :error="newCategoryEngErr")

        .form_item__container.add_category__btn
          Button(name='Добавить категорию' :onClick="() => addCategory()")

      .categories
        .empty_content(v-if="!categories.length")
          h3 Категории отсутствуют
        .item-link
          .title
            b Прямая ссылка на все категории товаров (клиентам):
          a.goodLink(:href="getLink('all').clients" target="_blank" rel="noopener noreferrer") {{getLink('all').clients}}
          .copy_link(@click="copyText(getLink('all').clients)") Копировать ссылку
        .item-link
          .title
            b Прямая ссылка на все категории товаров (партнерам):
          a.goodLink(:href="getLink('all').partners" target="_blank" rel="noopener noreferrer") {{getLink('all').partners}}
          .copy_link(@click="copyText(getLink('all').partners)") Копировать ссылку

        .category_container(v-for="category in categories")
          Category(:category="category" :isEdited="category.id === editedTodoId" :link="getLink(category.query)" v-on:set-is-edit="selectEditedCategory")


    .section(v-if="section === 'goods'")
      .empty_content(v-if="!goods.length")
        h3 Товары отсутствуют
      Goods()



</template>

<script>
  import {mapState} from "vuex";
  import Button from "@/components/uiComponents/Button";
  import Input from "@/components/uiComponents/Input";

  import { EditIcon, XIcon } from 'vue-feather-icons'
  import Category from "@/components/uiComponents/Category";
  import Goods from "@/components/uiComponents/Goods";
  import copy from "copy-to-clipboard";
  import {DEFAULT_PASS, MAIN_DOMAIN} from "@/constants/constants";


  export default {
    components: {
      Category,
      Goods,
      Input,
      Button,
      EditIcon,
      XIcon,
    },
    computed: {
      ...mapState(['serverError', 'userProfile', 'categories', 'goods']),
    },
    data() {
      return {
        domain: MAIN_DOMAIN,
        defaultPass: DEFAULT_PASS,
        newCategory: '',
        newCategoryEng: '',
        newCategoryErr: '',
        newCategoryEngErr: '',
        editedTodoId: 'null',
        section: 'goods',
      }
    },
    methods: {
      setSection(section) {
        this.section = section;
      },
      selectEditedCategory(id) {
        this.editedTodoId = id
      },
      addCategory() {
        this.newCategoryErr = '';
        if (!this.newCategory || !this.newCategoryEng) {
          this.newCategoryErr = 'Укажите название категории на обоих языках'
          return
        }
        this.$store.dispatch('createCategory', {
          name: this.newCategory,
          nameEng: this.newCategoryEng,
        })
        this.newCategory = '';
      },
      deleteCategory(category) {
        this.$store.dispatch('deleteCategory', {
          ...category,
        })
      },
      getLink(category) {
        return {
          clients: `${this.domain}/offers?p=${this.defaultPass}#${category}`,
          partners: `${this.domain}/partners?p=${this.defaultPass}#${category}`,
        }
      },
      copyText(text) {
        copy(text)
      }
    },
    mounted() {
      window.onbeforeunload = function() {
        if ( window.location.port !== '8080') return confirm('Точно хотите выйти?');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  h1
    a
      margin-left 10px
      white-space nowrap
  .item-link
    margin-bottom 20px
  .titles
    display inline-flex
    h2
      margin-right 30px
      cursor pointer

      &.active
        text-decoration underline
  .add_category
    display flex
    flex-direction column
    .add_category__btn
      margin-bottom 50px
  .row

    & + .row
      margin-top 8px

    &:first-of-type
      margin-top 0

    svg
      width 14px
      height 14px

      &.red
        stroke red

      &.yellow
        stroke orange

</style>
