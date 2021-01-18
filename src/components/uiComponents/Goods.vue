<template lang='pug'>
  .goods
    AddGood(v-if="isAddGood" :onClose="() => { isAddGood = false; goodForEdit= null; }" :goodForEdit="goodForEdit")

    .form_item__container
      Button(name='Добавить товар' :onClick="() => addGood()")

    h3 Фильтр
    .filters
      .form_item__container
        Input(name="material" v-model.trim="filterState.search" placeholder="Поиск по тексту" width="100%")
      .form_item__container
        Select(:options="categories" :value.sync="filterState.category" placeholder="Категории" isMulti)
      .form_item__container
        Select(:options="themes" :value.sync="filterState.themes" placeholder="Темы" isMulti)
      .form_item__container
        Select(:options="cities" :value.sync="filterState.cities" placeholder="Города" isMulti)
      .form_item__container
        Select(:options="stockStatuses" :value.sync="filterState.inStock" placeholder="Наличие" isMulti)
      .form_item__container
        .sort
          .type(:class="{'active': filterState.price === 'bottomToTop'}" @click="setSortPrice('bottomToTop')")
            | Цена
            ChevronsUpIcon
          .type(:class="{'active': filterState.price === 'topToBottom'}" @click="setSortPrice('topToBottom')")
            | Цена
            ChevronsDownIcon
        .label.priceCheckbox По минимальной цене
          input(type="checkbox" v-model="filterState.priceClientCheckbox")
      .form_item__container
        Button(name='Сбросить фильтр' :onClick="() => resetFilter()")


    .good_card__container(v-if="filteredGoods.length")
      GoodCard(v-for="(good, index) in filteredGoods" v-if="index < visibleGoods" :good="good" :openEditGood="() => openEditGood(good)" :key="good.id")
    .form_item__container(v-else)
      h3 Товары не найдены



</template>

<script>
import {mapState} from "vuex";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";
import Select from "@/components/uiComponents/Select";

import { EditIcon, XIcon, CheckCircleIcon, ChevronsDownIcon, ChevronsUpIcon } from 'vue-feather-icons'
import AddGood from "@/components/uiComponents/AddGood";
import GoodCard from "@/components/uiComponents/GoodCard";
import {copyObject} from "@/sevices/utils";
import { cities, goodInitial, stockStatuses, themes } from "@/constants/constants";

export default {
  components: {
    Select,
    AddGood,
    Input,
    Button,
    EditIcon,
    XIcon,
    CheckCircleIcon,
    GoodCard,
    ChevronsDownIcon,
    ChevronsUpIcon,
  },
  props: {
  },
  computed: {
    ...mapState(['categories', 'goods']),
    filterStateIsEmpty() {
      const { themes, cities, inStock, category, price, search } = this.filterState;
      return !themes.length && !cities.length && !inStock.length && !category.length && !price && !search;
    },
    filteredGoods() {
      this.visibleGoods = 5;
      const { themes, cities, inStock, category, price, search, priceClientCheckbox } = this.filterState;

      const goods = [...this.goods];
      const filtered = []

      if (this.filterStateIsEmpty) return goods

      goods.forEach((good) => {
        const isHave = [];
        if (themes.length) {
          isHave.push(good.themes
            .some(({ id }) => themes
              .map(i => i.id)
              .includes(id)
            )
          )
        }

        if (cities.length) {
          isHave.push(good.cities
            .some(({ id }) => cities
              .map(i => i.id)
              .includes(id)
            )
          )
        }

        if (inStock.length) {
          isHave.push(inStock
            .some(i => good.inStock && i.id === good.inStock.id)
          )
        }

        if (category.length) {
          isHave.push(good.category && good.category
            .some(({ id }) => category
              .map(i => i.id)
              .includes(id)
            )
          )
        }

        if (!isHave.includes(false)) filtered.push(good)

      })

      // сортируем так, чтобы товары без цены всегда были ниже
      if (price === 'bottomToTop') filtered.sort((a, b) => {
        const price1 = priceClientCheckbox ? a.priceClient || '' : a.price || '';
        const price2 = priceClientCheckbox ? b.priceClient || '' : b.price || '';
        if (price1 && price2) return this.getPriceForCompare(price1) - this.getPriceForCompare(price2);
        if (!price1 && !price2) return 0;
        if (!price1) return 1;
        if (!price2) return -1;
      })
      if (price === 'topToBottom') {
        filtered.sort((a, b) => {
          const price1 = priceClientCheckbox ? a.priceClient || '' : a.price || '';
          const price2 = priceClientCheckbox ? b.priceClient || '' : b.price || '';
          return this.getPriceForCompare(price2) - this.getPriceForCompare(price1)
        })
      }
      if (search.length > 2) return this.searchByAll(filtered, search)

      return filtered
    }
  },
  data() {
    return {
      visibleGoods: 5,
      isAddGood: false,
      goodForEdit: null,
      themes,
      cities,
      stockStatuses,
      filterState: {
        themes: [],
        cities: [],
        inStock: [],
        category: [],
        price: null,
        search: '',
        priceClientCheckbox: false,
      },
    }
  },
  methods: {
    getPriceForCompare(price) {
      if (!price) return 0;
      return Number(price.split('-')[0].replace(/[^+\d.]/g, '')).toFixed()
    },
    resetFilter() {
      this.$set(this.filterState, 'themes', []);
      this.$set(this.filterState, 'cities', []);
      this.$set(this.filterState, 'inStock', []);
      this.$set(this.filterState, 'category', []);
      this.$set(this.filterState, 'price', null);
      this.$set(this.filterState, 'search', '');
    },
    searchByAll(arr, search) {
      const searched = [];
      const searchProp = ['name', 'description', 'nameEng', 'descriptionEng', 'material', 'materialEng', 'year', 'yearEng', 'price', 'size', 'number'];

      for(let i = 0; i < arr.length; i++) {
        const good = arr[i];
        for(let j = 0; j < Object.keys(good).length; j++) {
          const key = Object.keys(good)[j];
          if (searchProp.includes(key) && good[key].toLowerCase().includes(search.toLowerCase())) {
            searched.push(good);
            break;
          }
        }
      }
      return searched;
    },
    setSortPrice(type) {
      const filter = this.filterState.price === type ? null : type
      this.$set(this.filterState, 'price', filter)
    },
    openEditGood(good) {
      this.addGood();
      this.goodForEdit = copyObject(good);
    },
    addGood() {
      this.isAddGood = true;
    }
  },
  async mounted() {
    // console.log(this.goods)
    // массовое обновление чего-либо в товарах, не использовать
    // for (const item of this.goods) {
    //   console.log('item.category', item.category)
    //   if (item.category) {
    //     await this.$store.dispatch('updateGood', {
    //       ...item,
    //       category: !item.category.length ? [item.category] : item.category,
    //     })
    //   }
    // }

    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.visibleGoods += 5;
      }
    };

    window.addEventListener('scroll', () =>{
      if ((document.documentElement.offsetHeight + document.documentElement.scrollTop) + 300 > document.documentElement.scrollHeight) {
        this.visibleGoods += 5;
      }
    });
  },
  destroyed() {
    window.removeEventListener('scroll', () => {})
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    display flex
    flex-direction column

    .filters
      display inline-flex
      flex-wrap wrap
      .form_item__container
        margin-right 10px

        .priceCheckbox
          margin-top 15px
          display flex
          align-items center
          input
            display inline-flex
            align-items center
            justify-content center
            margin-left 8px
            width 20px
            height 20px
            cursor pointer

        .sort
          display flex
          flex-direction row
          flex-wrap nowrap
          .type
            display flex
            align-items center
            justify-content center
            width 140px
            font-size 15px
            background-color $light_grey
            padding 5px
            border 1px solid $light_grey
            color white
            cursor pointer
            margin-right 1px
            border-radius 5px
            &.active
              background-color $main_color_blue
              border 1px solid $main_color_blue

</style>
