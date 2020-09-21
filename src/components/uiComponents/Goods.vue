<template lang='pug'>
  .goods
    AddGood(v-if="isAddGood" :onClose="() => { isAddGood = false; goodForEdit= null; }" :goodForEdit="goodForEdit")

    .form_item__container
      Button(name='Добавить товар' :onClick="() => addGood()")

    .good_card__container
      GoodCard(v-for="good in goods" :good="good" :openEditGood="() => openEditGood(good)")





</template>

<script>
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";

import { EditIcon, XIcon, CheckCircleIcon } from 'vue-feather-icons'
import AddGood from "@/components/uiComponents/AddGood";
import GoodCard from "@/components/uiComponents/GoodCard";
import {copyObject} from "@/sevices/utils";


export default {
  components: {
    AddGood,
    Input,
    Button,
    EditIcon,
    XIcon,
    CheckCircleIcon,
    GoodCard,
  },
  props: {
  },
  computed: {
    ...mapState(['categories', 'goods']),
  },
  data() {
    return {
      isAddGood: false,
      goodForEdit: null,
    }
  },
  methods: {
    openEditGood(good) {
      this.addGood();
      this.goodForEdit = copyObject(good);
    },
    addGood() {
      this.isAddGood = true;
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    display flex
    flex-direction column



</style>