import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBk9CPhGNW9UXbhw81OSPtqlAKbANOlkJU',
  authDomain: 'stone-crafting.firebaseapp.com',
  databaseURL: 'https://stone-crafting.firebaseio.com',
  projectId: 'stone-crafting',
  storageBucket: 'stone-crafting.appspot.com',
  messagingSenderId: '244412279777',
  appId: '1:244412279777:web:76480e4955929be2c380a0',
  measurementId: "G-YC0DH51T9T",
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage();


// collection references
const usersCollection = db.collection('users')
const categoriesCollection = db.collection('categories')
const goodsCollection = db.collection('goods')
const storageRef = firebase.storage().ref();
// export utils/refs
export {
  db,
  auth,
  usersCollection,
  categoriesCollection,
  goodsCollection,
  storage,
  storageRef,
}