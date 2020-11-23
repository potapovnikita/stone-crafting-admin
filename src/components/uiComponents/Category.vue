<template lang='pug'>
  div
    ConfirmPopup(v-if="showConfirmDelete"
      title="Вы точно хотите удалить категорию?"
      :onClose="() => showConfirmDelete = false"
      :confirmFunc="confirmDeleteCategory"
    )
    .category
      .edit_section
        .label Название:
        .edited
          .name.default_text(v-if="!isEdited") {{category.name}}
          .edit-container(v-else)
            Input(name="editCat" v-model.trim="editName" :error="editCategoryErr" class="edit-input" width="100%")
        .label Название на английском:
        .edited
          .name.default_text(v-if="!isEdited") {{category.nameEng}}
          .edit-container(v-else)
            Input(name="editCatEng" v-model.trim="editNameEng" :error="editCategoryEngErr" class="edit-input" width="100%")
        .actions(v-if="!isEdited")
          .icon.edit(title="Редактировать" @click="openEditMode()")
            EditIcon
          .icon.delete(title="Удалить категорию" @click="deleteCategory()")
            Trash2Icon
        .item
          .title
            b Прямая ссылка на категорию товаров:
          a.goodLink(:href="getLink()" target="_blank" rel="noopener noreferrer" :data-text="category.id") {{getLink()}}
          .copy_link(@click="copyText(getLink())") Копировать ссылку


        .edit-actions.actions(v-if="isEdited")
          .icon.confirm(title="Сохранить" @click="confirmEdit()")
            CheckCircleIcon
          .icon.cancel(title="Отменить"  @click="cancelEdit()")
            XIcon








</template>

<script>
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";

import { EditIcon, XIcon, CheckCircleIcon, Trash2Icon } from 'vue-feather-icons'
import {errorsFields} from "@/constants/constants";
import ConfirmPopup from "@/components/uiComponents/ConfirmPopup";
import copy from "copy-to-clipboard";
import { MAIN_DOMAIN, TEST_DOMAIN, DEFAULT_PASS } from "@/constants/constants";



export default {
  components: {
    Input,
    Button,
    EditIcon,
    Trash2Icon,
    XIcon,
    CheckCircleIcon,
    ConfirmPopup,
  },
  props: {
    category: {},
    isEdited: Boolean,
  },
  computed: {
    ...mapState(['serverError', 'userProfile', 'categories', 'goods']),
  },
  data() {
    return {
      domain: MAIN_DOMAIN,
      defaultPass: DEFAULT_PASS,
      editName: this.category.name,
      editNameEng: this.category.nameEng,
      editCategoryErr: '',
      editCategoryEngErr: '',
      showConfirmDelete: false,
    }
  },
  methods: {
    deleteCategory() {
      this.showConfirmDelete = true
    },
    async confirmDeleteCategory() {
      const isUsedCategory = this.goods.find(good => {
        return good.category.some(cat => cat.id === this.category.id)
      })

      // проверка, что категория уже используется в товарах
      if (!isUsedCategory) {
        await this.$store.dispatch('deleteCategory', {
          ...this.category
        })
        this.showConfirmDelete = false
      } else {
        alert(`В Категории "${this.category.name}" есть товары, сначала удалите товары из категории!`)
      }
    },
    async confirmEdit() {
      this.editCategoryErr = '';
      this.editCategoryEngErr = '';
      if (!this.editName.length) {
        this.editCategoryErr = errorsFields.empty
      }
      if (!this.editNameEng.length) {
        this.editCategoryEngErr = errorsFields.empty
      }
      if (!this.editName.length || !this.editNameEng.length) return

      await this.$store.dispatch('updateCategory', {
        ...this.category,
        name: this.editName,
        nameEng: this.editNameEng,
      })

      this.cancelEdit();
    },
    cancelEdit() {
      this.$emit('set-is-edit', null)
      this.clear();
    },
    openEditMode() {
      this.$emit('set-is-edit', this.category.id)
      this.clear();
    },
    clear() {
      this.editName = this.category.name
      this.editNameEng = this.category.nameEng
      this.editCategoryErr = ''
      this.editCategoryEngErr = ''
    },
    getLink() {
      return `${this.domain}/offers?p=${this.defaultPass}#${this.category.query}`
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
.category
  .edit_section
    margin-bottom 20px
    position relative
    min-width 300px
    max-width 600px
    background-color $light_grey_opacity
    border-radius: 10px
    padding 10px 5px

    .item
      margin 5px 0
      .title
        margin 5px 0
      .goodLink
        word-break: break-all;
      .copy_link
        margin 3px 0
        text-decoration underline
        opacity: 0.8;
        cursor pointer
        &:hover
          opacity: 1;
          text-decoration none
    .label
      margin-bottom 5px
      padding-left 10px


    .edited
      display flex
      align-items center
      margin-bottom 5px
      position relative
      border-radius: 10px;

      .name
        border-radius: 10px;
        background-color $lightest_grey
        padding 5px 10px
        margin-right 10px
        min-height 39px
        width 100%

      .edit-container
        width 100%



      .edit-actions
        position absolute
        right 10px
        top 8px
        z-index 1

      .edit-input
        width 100%
        &:nth-child
          width 100%

    .actions
      display inline-flex
      width 50px
      position absolute
      top 5px
      right -60px

      @media only screen and (max-width 600px)
        right 15px

</style>
