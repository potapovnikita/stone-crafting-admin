export const MAIN_DOMAIN = 'https://stone-crafting.com'
export const TEST_DOMAIN = 'http://stone-crafting.herokuapp.com'

export const DEFAULT_PASS = '1305091973'

export const errorsFields = {
  empty: 'Поле не может быть пустым',
  passwordConfirm: 'Пароли не совпадают',
  server: 'Ошибка сервера',
}

export const stores = [
  {
    name: 'Партнеры',
    code: 'partners',
  },
  {
    name: 'Клиенты',
    code: 'clients',
  },
  {
    name: 'Салон',
    code: 'salon',
  },
]

export const stockStatuses = [
  {
    id: 1,
    code: 'inStock',
    name: 'В наличии',
    nameEng: 'In stock',
  },
  {
    id: 2,
    code: 'onOrder',
    name: 'Под заказ',
    nameEng: 'On order',
  },
  {
    id: 3,
    code: 'notAvailable',
    name: 'Нет в наличии',
    nameEng: 'Not available',
  },
]

export const cities = [
  {
    id: 1,
    code: 'ekb',
    name: 'Екатеринбург',
    nameEng: 'Yekaterinburg',
  },
  {
    id: 2,
    code: 'spb',
    name: 'Санкт-Петербург',
    nameEng: 'Saint-Petersburg',
  },
  {
    id: 3,
    code: 'msk',
    name: 'Москва',
    nameEng: 'Moscow',
  },
]

export const themes = [
  {
    id: 1,
    name: 'Охота',
    nameEng: 'Hunting',
  },
  {
    id: 2,
    name: 'Религиозная тема',
    nameEng: 'Religious theme',
  },
  {
    id: 3,
    name: 'Восточная тема',
    nameEng: 'Eastern theme',
  },
  {
    id: 4,
    name: 'Исторические персонажи',
    nameEng: 'Historical personages',
  },
  {
    id: 5,
    name: 'Герои сказок и былин',
    nameEng: 'Heroes of fairy tales and epics',
  },
  {
    id: 6,
    name: 'Россия',
    nameEng: 'Russia',
  },
  {
    id: 7,
    name: 'Америка',
    nameEng: 'America',
  },
  {
    id: 8,
    name: 'Азия',
    nameEng: 'Asia',
  },
  {
    id: 9,
    name: 'Европа',
    nameEng: 'Europe',
  },
  {
    id: 10,
    name: 'Цветы',
    nameEng: 'Flowers',
  },
  {
    id: 11,
    name: 'Животные',
    nameEng: 'Animals',
  },
  {
    id: 12,
    name: 'Спорт',
    nameEng: 'Sport',
  },
]

export const goodInitial = {
  name: '',
  description: '',
  descriptionEng: '',
  material: '',
  materialEng: '',
  year: '',
  yearEng: '',
  price: '',
  priceClient: '',
  size: '',
  sizeEng: '',
  visibility: [],
  cities: [],
  themes: [],
  inStock: null,
  category: [],
  photos: [],
  documents: [],
  videos: [],
};

