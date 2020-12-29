// import fetch from '@/utils/fetch'
import axios from 'axios'
import { createStore } from 'vuex'
import {
  API_COLUMN_GETS,
  API_USER_LOGIN,
  API_USER_CURRENT
} from '@/api'

interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
}
interface ListProps<P> {
  [id: string]: P;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
interface GlobalDataProps {
  token: string;
  user: UserProps;
  posts: [];
  // columns: {
  //   data: ListProps<ColumnProps>;
  // };
  columns: [];
  isLoading: boolean;
}
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    user: {
      isLogin: false
    },
    posts: [],
    columns: [],
    isLoading: false
  },
  mutations: {
    login (state, token) {
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      state.user = {
        isLogin: false
      }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    setUserInfo (state, data) {
      state.user = { isLogin: true, ...data }
    },
    fetchColumns (state, data) {
      state.columns = data.list
    },
    setLoading (state, status: boolean) {
      state.isLoading = status
    }
  },
  actions: {
    fetchColumns (context, data = {
      currentPage: 1,
      pageSize: 6
    }) {
      API_COLUMN_GETS(data).then(res => {
        context.commit('fetchColumns', res.data.data)
      })
    },
    async login ({ commit }, data) {
      const res = await API_USER_LOGIN(data)
      if (res.status === 200) {
        commit('login', res.data.data.token)
      }
      return res
    },
    fetchUserInfo ({ commit }) {
      API_USER_CURRENT().then(res => {
        if (res.status === 200) {
          commit('setUserInfo', res.data.data)
        }
      })
    },
    loginAndFetchUserInfo ({ dispatch }, data) {
      return dispatch('login', data).then(() => {
        return dispatch('fetchUserInfo')
      })
    }
  }
})

export default store
