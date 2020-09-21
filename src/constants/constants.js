
export const errorsFields = {
  empty: 'Поле не может быть пустым',
  passwordConfirm: 'Пароли не совпадают',
  server: 'Ошибка сервера',
}

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
    code: 'ekb',
    name: 'Охота',
    nameEng: 'Охота',
  },
  {
    id: 2,
    code: 'spb',
    name: 'Рыбалка',
    nameEng: 'Рыбалка',
  },
  {
    id: 3,
    code: 'spb',
    name: 'История',
    nameEng: 'История',
  },
  {
    id: 4,
    code: 'spb',
    name: 'Восток',
    nameEng: 'Восток',
  },
  {
    id: 5,
    code: 'spb',
    name: 'Запад',
    nameEng: 'Запад',
  },
  {
    id: 6,
    code: 'spb',
    name: 'Египет',
    nameEng: 'Египет',
  },
  {
    id: 7,
    code: 'spb',
    name: 'Религия',
    nameEng: 'Религия',
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
  size: '',
  cities: [],
  themes: [],
  inStock: null,
  category: null,
  photos: [],
  documents: [],
};

