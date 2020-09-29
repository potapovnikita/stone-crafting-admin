<template lang='pug'>
  div
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
          .icon.delete(title="Удалить категорию" @click="deleteCategory(category)")
            Trash2Icon


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

export default {
  components: {
    Input,
    Button,
    EditIcon,
    Trash2Icon,
    XIcon,
    CheckCircleIcon,
  },
  props: {
    category: {},
    isEdited: Boolean,
  },
  computed: {
    ...mapState(['serverError', 'userProfile', 'categories']),
  },
  data() {
    return {
      editName: this.category.name,
      editNameEng: this.category.nameEng,
      editCategoryErr: '',
      editCategoryEngErr: '',
    }
  },
  methods: {
    deleteCategory(category) {
      this.$store.dispatch('deleteCategory', {
        ...category,
      })
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
    border-radius: 10px;
    padding 10px 5px

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