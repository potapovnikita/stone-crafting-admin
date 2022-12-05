<template lang='pug'>
  .good
    #btn.form_item__container.cert
      Button(:onClick="() => createCert()" name="Создать сертификат")
      .label C ценой:
        input(type="checkbox" v-model="withPrice" class="certCheckbox")

    ConfirmPopup(v-if="showConfirmDelete"
      title="Вы точно хотите удалить товар?"
      :onClose="() => showConfirmDelete = false"
      :confirmFunc="confirmDeleteGood"
      )
    .actions
      .icon.edit(title="Редактировать" @click="openEditMode()")
        EditIcon
      .icon.delete(title="Удалить товар" @click="deleteGood()")
        Trash2Icon

    .item
      .title Прямая ссылка на товар (клиентам):
      .content
        a.goodLink(:href="getLink().clients" target="_blank" rel="noopener noreferrer" :data-text="good.number") {{getLink().clients}}
        .copy_link(@click="copyText(getLink().clients)") Копировать ссылку

    .item
      .title Прямая ссылка на товар (партнерам):
      .content
        a.goodLink(:href="getLink().partners" target="_blank" rel="noopener noreferrer" :data-text="good.number") {{getLink().partners}}
        .copy_link(@click="copyText(getLink().partners)") Копировать ссылку

    .item
      .title Прямая ссылка на товар (салон):
      .content
        a.goodLink(:href="getLink().salon" target="_blank" rel="noopener noreferrer" :data-text="good.number") {{getLink().salon}}
        .copy_link(@click="copyText(getLink().salon)") Копировать ссылку

    .item
      .title Название:
      .content {{good.name || '-'}}

    .item
      .title Название на Англ:
      .content {{good.nameEng || '-'}}

    .item
      .title Номер товара:
      .content {{good.number || '-'}}
    .item
      .title Категория:
      .content
        span(v-if="good.category && good.category.length" v-for="cat in good.category") {{getCategory(cat.id).name || '-'}}
        span(v-else) Категория не указана

    .item
      .title Товар виден:
      .content.warning(v-if="!isVisible") Никому
      .content(v-else)
        span(v-for="cat in good.visibility") {{cat.name}}

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
      .title Размер:
      .content {{good.size ? good.size : '-'}}

    .item
      .title Размер на англ:
      .content {{good.sizeEng ? good.sizeEng : '-'}}

    .item
      .title Рекомендованная цена:
      .content {{good.price ? good.price + ' ₽' : '-'}} (в $ переводится автоматически по текущему курсу)
    .item
      .title Минимальная цена:
      .content {{good.priceClient ? good.priceClient + ' ₽' : '-'}} (в $ переводится автоматически по текущему курсу)

    .item
      .title Год:
      .content {{good.year || '-'}}
    //.item
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

    .item(v-if="showMedia")
      .title Изображения:
      .content
        .images(v-if="good.photos && good.photos.length")
          a(v-for="photo in good.photos" :href="photo.url" target="_blank")
            img.img(:src="photo.url" alt="photo.name")
        span(v-if="!good.photos || !good.photos.length") Фотографий нет

    .item(v-if="showMedia")
      .title Видео:
      .content
        .video(v-if="good.videos && good.videos.length")
          a.vid(v-for="vid in good.videos" :href="vid.url" target="_blank") {{vid.name}}
        span(v-if="!good.videos || !good.videos.length") Видео нет

    .item(v-if="showMedia")
      .title Документы:
      .content
        .documents(v-if="good.documents && good.documents.length")
          a.doc(v-for="doc in good.documents" :href="doc.url" target="_blank") {{doc.name}}
        span(v-if="!good.documents || !good.documents.length") Документов нет





</template>

<script>
import copy from 'copy-to-clipboard';
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";
import { EditIcon, XIcon, CheckCircleIcon, Trash2Icon } from 'vue-feather-icons'
import AddGood from "@/components/uiComponents/AddGood";
import ConfirmPopup from "@/components/uiComponents/ConfirmPopup";
import { MAIN_DOMAIN, TEST_DOMAIN, DEFAULT_PASS } from "@/constants/constants";

export default {
  components: {
    ConfirmPopup,
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
    isVisible() {
      return this.good.visibility && this.good.visibility.length
    },
  },
  data() {
    return {
      domain: MAIN_DOMAIN,
      defaultPass: DEFAULT_PASS,
      isAddGood: false,
      showConfirmDelete: false,
      withPrice: false,
      showMedia: window.location.port !== '8080',
    }
  },
  methods: {
    getCategory(id) {
      return this.categories.find(i => i.id === id)
    },
    openEditMode() {
      this.openEditGood()
    },
    deleteGood() {
      this.showConfirmDelete = true
    },
    async confirmDeleteGood() {
      await this.$store.dispatch('deleteGood', {
        ...this.good
      })
      this.showConfirmDelete = false
    },
    addGood() {
      this.isAddGood = true;
    },
    async createCert() {
      await this.$store.dispatch('createCert', {
        ...this.good,
        withPrice: this.withPrice,
      })
    },
    getLink() {
      return {
        clients: `${this.domain}/offers?id=${this.good.number}&p=${this.defaultPass}#${this.getCategory(this.good.category[0].id).query}`,
        partners: `${this.domain}/partners?id=${this.good.number}&p=${this.defaultPass}#${this.getCategory(this.good.category[0].id).query}`,
        salon: `${this.domain}/salon?id=${this.good.number}&p=${this.defaultPass}#${this.getCategory(this.good.category[0].id).query}`,
      }
    },
    copyText(text) {
      copy(text)
    }
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
  .cert
    display inline-flex
    align-items center

    @media only screen and (max-width 600px)
      display flex
      flex-direction column
      align-items flex-start

      .label
        margin-top 15px

    .label
      margin-left 10px

      .certCheckbox
        display inline-flex
        align-items center
        justify-content center
        margin-left 8px
        width 20px
        height 20px
  .actions
    position absolute
    display inline-flex
    top 10px
    right 20px
  .item
    display inline-flex
    margin-bottom 5px
    .copy_link
      margin 3px 0
      text-decoration underline
      opacity: 0.8;
      cursor pointer
      &:hover
        opacity: 1;
        text-decoration none
    .title
      margin-right 5px
      margin-bottom 10px
      font-weight bold
    .content
      display flex
      flex-direction column
      .goodLink
        word-break: break-all;

      &.warning
        color $light_red
      .documents
      .video
        display flex
        flex-direction column
        .doc
        .vid
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
