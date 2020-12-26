import axios from 'axios'
import { createStore } from 'vuex'
import {
  API_COLUMN_GETS
} from '@/api'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
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
    user: {
      isLogin: false
    },
    posts: [],
    columns: [],
    isLoading: false
  },
  mutations: {
    LOGIN (state) {
      state.user = {
        name: 'vvvv',
        id: 1,
        isLogin: true
      }
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
    fetchColumn ({ commit }, id) {
      axios.get(`/api/columns/${id}`).then(res => {
        commit('fetchColumn', res.data.data)
      })
    },
    fetchPosts (context) {
      axios.get('/api/columns').then(res => {
        context.commit('fetchColumns', res.data.data)
      })
    },
    fetchPost ({ commit }, id) {
      axios.get(`/api/columns/${id}`).then(res => {
        commit('fetchColumn', res.data.data)
      })
    }
  }
})

export default store
