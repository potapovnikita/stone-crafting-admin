<template lang='pug'>
  .container
    h1 Администрирование сайта
      a(href="www.stone-crafting.com" target="_blank" title="Перейти на сайт") stone-crafting.com

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
        .category_container(v-for="category in categories")
          Category(:category="category" :isEdited="category.id === editedTodoId" v-on:set-is-edit="selectEditedCategory")


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
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" scoped>
  h1
    a
      margin-left 10px
      white-space nowrap

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