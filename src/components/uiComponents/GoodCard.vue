<template lang='pug'>
  .good
    //#btn.form_item__container
      Button(:onClick="() => createCert()" name="Создать сертификат")
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
      .content(v-if="good.category") {{good.category.name || '-'}}
      .content(v-else) Категория не указана

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
          a(v-for="photo in good.photos" :href="photo.url" target="_blank")
            img.img(:src="photo.url" alt="photo.name")
        span(v-if="!good.photos || !good.photos.length") Фотографий нет

    .item
      .title Видео:
      .content
        .video(v-if="good.videos && good.videos.length")
          a.vid(v-for="vid in good.videos" :href="vid.url" target="_blank") {{vid.name}}
        span(v-if="!good.videos || !good.videos.length") Видео нет

    .item
      .title Документы:
      .content
        .documents(v-if="good.documents && good.documents.length")
          a.doc(v-for="doc in good.documents" :href="doc.url" target="_blank") {{doc.name}}
        span(v-if="!good.documents || !good.documents.length") Документов нет





</template>

<script>
import { myFont } from '@/sevices/pdfFont';
import { jsPDF } from "jspdf";

import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";

import { EditIcon, XIcon, CheckCircleIcon, Trash2Icon } from 'vue-feather-icons'
import AddGood from "@/components/uiComponents/AddGood";
import { arrayBufferToBase64 } from "@/sevices/utils"
import ConfirmPopup from "@/components/uiComponents/ConfirmPopup";


//    onClose: Function,
//   confirmFunc: Function,
//   iconType: String,
//   title: String,
//   text: String,
//   error: String,

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
      isAddGood: false,
      showConfirmDelete: false,
      doc: new jsPDF(),
    }
  },
  methods: {
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
    createCert() {
      // const html = "<!doctype html>\n" +
      //   "<html lang=\"ru\">\n" +
      //   "  <head>\n" +
      //   "  <meta charset=\"utf-8\">\n" +
      //   "  <link href=\"https://fonts.googleapis.com/css2?family=Roboto\" rel=\"stylesheet\">\n" +
      //   "  </head>\n" +
      //   "  <body style=\"font-family: 'Roboto', sans-serif;\">\n" +
      //   "<div>123 привет ПРИВЕТ</div>\n" +
      //   "  </body>\n" +
      //   "</html>"
      //
      // this.doc.addFileToVFS("MyFont.ttf", myFont);
      // this.doc.addFont("MyFont.ttf", "MyFont", "normal");
      // this.doc.setFont("MyFont");
      //
      // console.log('this.doc', this.doc)
      // // this.doc.text(html, 10, 10);
      // // this.doc.save("a4.pdf");
      // this.doc.html(html, {
      //   callback: (doc) => {
      //     console.log('doc', doc)
      //     doc.addFileToVFS("MyFont.ttf", myFont);
      //     doc.addFont("MyFont.ttf", "MyFont", "normal");
      //     doc.setFont("MyFont");
      //     doc.save("a4.pdf");
      //   },
      //   x: 10,
      //   y: 10
      // });
        var w = window.open();


      const html = "<!doctype html>\n" +
        "<html lang=\"ru\">\n" +
        "  <head>\n" +
        "  <meta charset=\"utf-8\">\n" +
        "  <link href=\"https://fonts.googleapis.com/css2?family=Roboto\" rel=\"stylesheet\">\n" +
        "  </head>\n" +
        "  <body style=\"font-family: 'Roboto', sans-serif;\">\n" +
        "<div>123 привет ПРИВЕТ</div>\n" +
        "  </body>\n" +
        "</html>"


        w.document.write(html);
        w.window.print();
        w.document.close();

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
