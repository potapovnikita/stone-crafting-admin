<template lang='pug'>
  Popup(:onClose="() => onClose()")
    h3 Добавить товар
    .form_item__container
      Select(:options="categories" :value.sync="good.category" placeholder="Выберите категорию")
    .form_item__container
      Input(name="name" v-model.trim="good.name" :error="errors.name" placeholder="Название товара")
    .form_item__container
      Input(name="nameEng" v-model.trim="good.nameEng" :error="errors.nameEng" placeholder="Название товара на английском")
    .form_item__container
      Textarea(name="description" v-model.trim="good.description" placeholder="Описание товара")
    .form_item__container
      Textarea(name="descriptionEng" v-model.trim="good.descriptionEng" placeholder="Описание товара на английском")
    .form_item__container
      Input(name="material" v-model.trim="good.material" placeholder="Материалы")
    .form_item__container
      Input(name="materialEng" v-model.trim="good.materialEng" placeholder="Материалы на английском")
    .form_item__container
      Input(name="year" v-model.trim="good.year" placeholder="Год создания")
    .form_item__container
      Input(name="yearEng" v-model.trim="good.yearEng" placeholder="Год создания на английском")
    .form_item__container
      Input(name="size" v-model.trim="good.size" placeholder="Размер (в мм)")
    .form_item__container
      Input(name="price" v-model.trim="good.price" :error="errors.price" placeholder="Цена")
    .form_item__container
      Select(:options="stockStatuses" :value.sync="good.inStock" placeholder="Наличие")
    .form_item__container
      Select(:options="cities" :value.sync="good.cities" placeholder="Город" isMulti)
    .form_item__container
      Select(:options="themes" :value.sync="good.themes" placeholder="Темы" isMulti)



    .form_item__container
      .add_file_container
        h4.title Фотографии
        input#fileInput(type="file"
          ref="fileRef"
          accept="image/*"
          multiple
          style="display: none"
          @change="updateImages"
        )
        .add_file.icon.add(@click="addFile()")
          | Загрузить&nbsp;
          ImageIcon
          PlusIcon

        .files_empty(v-if="good.photos && good.photos.length === 0") Фотографии не добавлены
        .files(v-if="good.photos && good.photos.length")
          .file(v-for="(file, index) in good.photos" :key="index")
            .img
              img(:src="getFile(file)" :alt="file.name")
            .delete_file.icon.delete(title="Удалить фото" @click="deleteFile(index, 'photo')")
              | Удалить
              Trash2Icon

    .form_item__container
      .add_file_container
        h4.title Документы
        input#docInput(type="file"
          ref="docRef"
          accept="application/pdf"
          multiple
          style="display: none"
          @change="updateDocuments"
        )
        .add_file.icon.add(@click="addDoc()")
          | Загрузить&nbsp;
          FileTextIcon
          PlusIcon

        .files_empty(v-if="good.documents && good.documents.length === 0") Файлы не добавлены
        .files.docs(v-if="good.documents && good.documents.length")
          .file(v-for="(file, index) in good.documents" :key="index")
            .item {{file.name}}
            .delete_doc.icon.delete(title="Удалить документ" @click="deleteFile(index, 'doc')")
              | Удалить
              Trash2Icon


      .form_item__container
        Button(:name="goodForEdit ? 'Изменить' : 'Добавить'" :onClick="() => addOrUpdateGood()" :disabled="serverLoader")




</template>

<script>
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";
import Popup from "@/components/uiComponents/Popup";

import { EditIcon, XIcon, CheckCircleIcon, PlusIcon, ImageIcon, Trash2Icon, FileTextIcon } from 'vue-feather-icons'
import Select from "@/components/uiComponents/Select";

import {cities, goodInitial, stockStatuses, themes} from "@/constants/constants";
import Textarea from "@/components/uiComponents/Textarea";
import {arrayBufferToBase64, getFilesFromData, toBase64} from "@/sevices/utils";

export default {
  components: {
    Select,
    Popup,
    Input,
    Textarea,
    Button,
    EditIcon,
    PlusIcon,
    ImageIcon,
    XIcon,
    Trash2Icon,
    CheckCircleIcon,
    FileTextIcon,
  },
  props: {
    onClose: Function,
    goodForEdit: Object,
  },
  computed: {
    ...mapState(['categories', 'goods', 'serverLoader']),
  },
  data() {
    return {
      good: this.goodForEdit ? { ...this.goodForEdit } : { ...goodInitial },
      isAddGood: false,
      errors: {
        name: '',
        nameEng: '',
        price: '',
        city: '',
        inStock: '',
        category: '',
      },
      cities,
      stockStatuses,
      themes,
    }
  },
  methods: {
    updateImages(e) {
      if (e.target.files.length) {
        this.$set(this.good, 'photos', this.good.photos ? [...this.good.photos, ...e.target.files] : [...e.target.files]);
        e.target.value = '';
      }
    },
    updateDocuments(e) {
      if (e.target.files.length) {
        this.$set(this.good, 'documents', this.good.documents ? [...this.good.documents, ...e.target.files] : [...e.target.files]);
        e.target.value = '';
      }
    },
    deleteFile(index, type) {
      if (type === 'photo') this.good.photos.splice(index, 1);
      if (type === 'doc') this.good.documents.splice(index, 1);
    },
    getFile(file) {
      if (file.url) return file.url
      return window.URL.createObjectURL(file)
    },
    // Загрузки изображений и документов
    addFile() {
      this.$refs.fileRef.click();
    },
    addDoc() {
      this.$refs.docRef.click();
    },
    async addOrUpdateGood() {
      const good = {...this.good}

      if (this.goodForEdit) {
        await this.$store.dispatch('updateGood', {
          ...good
        })
      } else {
        await this.$store.dispatch('createGood', {
          ...good
        })
      }

      this.good = { ...goodInitial };
      this.onClose();
    },

  },
  async mounted() {
    if (this.goodForEdit) this.good.photos = this.goodForEdit.photos
  }
}
</script>

<style lang="stylus" scoped>
  h3, h4
    text-align center

  .add_file_container
    margin-bottom 15px
    .title
      margin-bottom 15px
    .add_file
      display flex
      align-items center
      margin-bottom 15px
      &:hover
        color $main_color_green
    .files_empty
      font-size 14px
      color $yelllow
    .files
      display inline-flex
      flex-wrap wrap
      .item
        display inline-flex
        color $main_color_blue
        margin-right 15px
      .file
        margin 3px

        .img
          width 100px
          height 100px
          outline 1px solid $main_color_blue
          margin-bottom 3px
          display: flex;
          justify-content: center;
          align-items: center;
          img
            max-width 100px
            max-height 100px

        .delete_doc,
        .delete_file
          cursor pointer
          display flex
          align-items center
          justify-content center
          svg
            width 18px
            height 18px
          &:hover
            color $light_red

        .delete_doc
          display inline-flex

    .docs
      flex-direction column







</style>