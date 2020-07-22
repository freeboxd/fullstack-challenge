import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store';
import { UserInterface } from '~/types';
import authService from '~/services/auth.service';

const user = JSON.parse(localStorage.getItem('user')?? '{}');

export interface AuthStoreInterface {
  status: {
    loggedIn: boolean
  },
  user: UserInterface | null
}

const initialState: AuthStoreInterface = (user && user.accessToken)
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const state = () => initialState;

export type AuthModule = ReturnType<typeof state>

export const getters: GetterTree<AuthModule, RootState> = {
  loggedIn: state => state.status.loggedIn,
}

export const mutations: MutationTree<AuthStoreInterface> = {
  loginSuccess(state: AuthStoreInterface, userAuthData) {
    state.status.loggedIn = true;
    state.user = userAuthData;
    localStorage.setItem('user', JSON.stringify(userAuthData));
  },
  loginFailure(state: AuthStoreInterface) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state: AuthStoreInterface) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state: AuthStoreInterface) {
    state.status.loggedIn = false;
  },
  registerFailure(state: AuthStoreInterface) {
    state.status.loggedIn = false;
  }
}

export const actions: ActionTree<AuthModule, RootState> = {
  async authenticate({ commit }, user: UserInterface) {
    return authService.authenticate(user).then(
      (userAuth) => {
        commit('loginSuccess', userAuth);
        return Promise.resolve(userAuth);
      },
      (error) => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  async logout({ commit }) {
    await authService.logout();
    commit('logout');
  },
  async register({ commit }, user: UserInterface) {
    return authService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  }
}
