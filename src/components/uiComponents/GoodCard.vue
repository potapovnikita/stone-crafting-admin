<template lang='pug'>
  .good
    .actions
      .icon.edit(title="Редактировать" @click="openEditMode()")
        EditIcon
      .icon.delete(title="Удалить товар" @click="deleteGood()")
        Trash2Icon
    .item
      .title Категория:
      .content(v-if="good.category") {{good.category.name || '-'}}
      .content(v-else) Категория не указана

    .item
      .title Название:
      .content {{good.name || '-'}}

    .item
      .title Название на Англ:
      .content {{good.nameEng || '-'}}
    .item
      .title Описание:
      .content {{good.description || '-'}}
    .item
      .title Описание на Англ:
      .content {{good.descriptionEng || '-'}}
    .item
      .title Материалы:
      .content {{good.material || '-'}}
    .item
      .title Материалы на Англ:
      .content {{good.materialEng || '-'}}
    .item
      .title Темы:
      .content
        span(v-if="good.themes.length" v-for="theme in good.themes") {{theme.name}}
        span(v-if="!good.themes.length") темы не указаны

    .item
      .title Цена:
      .content {{good.price ? good.price + ' ₽' : '-'}} (в $ переводится автоматически по текущему курсу)

    .item
      .title Год:
      .content {{good.year || '-'}}
    .item
      .title Год на англ:
      .content {{good.yearEng || '-'}}
    .item
      .title Наличие:
      .content(v-if="good.inStock") {{good.inStock.name || '-'}}
      .content(v-else) Не указано
    .item
      .title Города:
      .content
        span(v-if="good.cities.length" v-for="city in good.cities") {{city.name}}
        span(v-if="!good.cities.length") города не указаны

    .item
      .title Изображения:
      .content
        .images(v-if="good.photos && good.photos.length")
          img.img(v-for="photo in good.photos" :src="photo.url" alt="photo.name")
        span(v-if="!good.photos || !good.photos.length") фотографий нет
    .item
      .title Документы:
      .content
        .documents(v-if="good.documents && good.documents.length")
          a.doc(v-for="doc in good.documents" :href="doc.url" target="_blank") {{doc.name}}
        span(v-if="!good.documents || !good.documents.length") документов нет





</template>

<script>
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";

import { EditIcon, XIcon, CheckCircleIcon, Trash2Icon } from 'vue-feather-icons'
import AddGood from "@/components/uiComponents/AddGood";
import { arrayBufferToBase64 } from "@/sevices/utils"

export default {
  components: {
    AddGood,
    Input,
    Button,
    EditIcon,
    Trash2Icon,
    XIcon,
    CheckCircleIcon,
  },
  props: {
    good: Object,
    openEditGood: Function,
  },
  computed: {
    ...mapState(['categories', 'goods']),
  },
  data() {
    return {
      isAddGood: false,
    }
  },
  methods: {
    openEditMode() {
      this.openEditGood();
    },
    async deleteGood() {
      await this.$store.dispatch('deleteGood', {
        ...this.good
      })
    },
    addGood() {
      this.isAddGood = true;
    },
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.good
  display flex
  flex-direction column
  background-color $lightest_grey
  border-radius 10px
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  padding 10px
  margin-bottom 15px
  position relative
  .actions
    position absolute
    display inline-flex
    top 10px
    right 20px
  .item
    display inline-flex
    margin-bottom 5px
    .title
      margin-right 5px
      margin-bottom 10px
      font-weight bold
    .content
      display flex
      flex-direction column
      .documents
        display flex
        flex-direction column
        .doc
          color $main_color_blue
          cursor pointer
          text-decoration none
          &:hover
            text-decoration underline
      .images
        display flex
        flex-direction row
        flex-wrap wrap
        .img
          width 100px
          height 100px
          outline 1px solid $main_color_blue
          margin-bottom 8px
          margin-right 8px
          & img
            max-width 100px
            max-height 100px





</style>