import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../api/firebase';
import { router } from '@/main';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

Vue.use(Vuex)

// realtime firebase
fb.categoriesCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let categoriesArray = []

  snapshot.forEach(doc => {
    let category = doc.data()
    category.id = doc.id

    categoriesArray.push(category)
  })

  store.commit('setCategories', categoriesArray)
})

fb.goodsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let goodsArray = []

  snapshot.forEach(doc => {
    let good = doc.data()
    good.id = doc.id

    goodsArray.push(good)
  })

  store.commit('setGoods', goodsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    categories: [],
    goods: [],
    serverError: null,
    serverLoader: null,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setCategories(state, val) {
      state.categories = val
    },
    setGoods(state, val) {
      state.goods = val
    },
    setError(state, val) {
      let errorText = '';
      switch (val.code) {
        case 'auth/invalid-email': errorText = 'Неверный E-mail'
          break;
        case 'auth/user-not-found': errorText = 'Пользователь не найден'
          break;
        default: errorText = 'Ошибка'
      }
      state.serverError = errorText;
    },
    setLoader(state, val) {
      state.serverLoader = val
    },
    clearError(state) {
      state.serverError = '';
    },
  },
  actions: {
    async login({ commit, dispatch }, form) {
      commit('clearError')
      try {
        // sign user in
        const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setError', error)
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {

      try {
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()
        // set user profile in state
        commit('setUserProfile', userProfile.data())
        // change route to dashboard
        if (router.currentRoute.path === '/login') {
          router.push('/')
        }
      } catch (err) {
      }

    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async createCategory({ state, commit }, category) {
      commit('setLoader', true)
      await fb.categoriesCollection.add({
        ...category,
        createdOn: new Date(),
        categoryId: uuidv4(),
        userId: fb.auth.currentUser.uid,
        query: category.nameEng.replaceAll(' ', '').toLowerCase(),
      })
      commit('setLoader', false)
    },

    async updateCategory({ state, commit }, category) {
      commit('setLoader', true)
      await fb.categoriesCollection.doc(category.id).update({
        ...category,
        query: category.nameEng.replaceAll(' ', '').toLowerCase(),
      })
      commit('setLoader', false)
    },

    async deleteCategory({ state, commit }, category) {
      await fb.categoriesCollection.doc(`${category.id}`).delete()
    },

    async createGood({ state, commit }, good) {
      commit('setLoader', true)
      const photos = await uploadFiles(good.photos, 'photos');
      const documents = await uploadFiles(good.documents, 'documents');
      const videos = await uploadFiles(good.videos, 'videos');
      good.photos = photos;
      good.documents = documents;
      good.videos = videos;
      good.category = good.category.map((c) => ({ id: c.id }))
      await fb.goodsCollection.add({
        ...good,
        createdOn: new Date(),
        goodId: uuidv4(),
        userId: fb.auth.currentUser.uid,
        number: String(new Date().getTime()).slice(5),
      })
      commit('setLoader', false)
    },

    async updateGood({ state, commit }, good) {
      commit('setLoader', true)
      const photos = await uploadFiles(good.photos, 'photos');
      const documents = await uploadFiles(good.documents, 'documents');
      good.photos = photos;
      good.documents = documents;
      good.category = good.category.map((c) => ({ id: c.id }))

      await fb.goodsCollection.doc(good.id).update({
        ...good,
        number: good. number || String(new Date().getTime()).slice(5),
      })
      commit('setLoader', false)
    },

    async deleteGood({ state, commit }, good) {
      await fb.goodsCollection.doc(`${good.id}`).delete()
    },

    async createCert({ state, commit }, good) {
      const data = {
        number: good.number,
        name: good.name,
        materials: good.material,
        description: good.description,
        size: good.size,
        year: good.year,
        photo: good.photos && good.photos.length && good.photos[0].url,
        price: good.withPrice ? good.price.replace(/[^+\d.]/g, '') : null,
      }

      const res = await axios.post(
        'https://nikitapotapov93.jsreportonline.net/api/report',
        {
          "template": {
            "name": "/certificate/certificate",
          },
          data,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Basic bmlraXRhcG90YXBvdjkzQGdtYWlsLmNvbToxcWF6WFNXQA==',
          },
          responseType: 'arraybuffer',
          dataType:'blob'
        }
        );

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      const file = new Blob([(res.data)], {type: 'application/pdf'});
      a.href = URL.createObjectURL(file);
      // window.open(fileURL);
      a.download = `${data.name}.pdf`;
      a.click();
    },


    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

    }
  }
})

const uploadFiles = async (files, type) => {
  const photos = [];
  if (files.length) {
    for (const item of files) {
      // если файл уже есть, не будем его грузить заново
      if (item.url) {
        photos.push({ ...item });
      } else {
        const randomName = item.name + '____' + String(new Date().getTime()).slice(5);

        // const minioClient = new Minio.Client({
        //   endPoint: 'hb.bizmrg.com',
        //   useSSL: false,
        //   accessKey: 'b6pMbWukTdhtzwU4xAtLZb',
        //   secretKey: 'cby5rANxrTD8ki3sxmCrXJzF7avNGT3dLm18tYvfkzdG'
        // });
        //
        // minioClient.listBuckets((err, res) => {
        //   console.log('err', err)
        //   console.log('res', res)
        // })

        await fb.storageRef.child(`${type}/${randomName}`).put(item).then(async (snapshot) => {
          await snapshot.ref.getDownloadURL().then((res) => {
            photos.push({
              url: res,
              name: randomName,
              id: uuidv4(),
            });
          })
        });
      }
    }
  }
  return photos;
}

export default store
