import { PROGRESS_START_ACTION, PROGRESS_END_ACTION } from './action';
import { PROGRESS_START_MUTATION, PROGRESS_END_MUTATION } from './mutation';

export default {
  state: {
    isProgress: false,
  },
  actions: {
    async [PROGRESS_START_ACTION]() {
      this.commit({
        type: PROGRESS_START_MUTATION,
      });
    },
    async [PROGRESS_END_ACTION]() {
      this.commit({
        type: PROGRESS_END_MUTATION,
      });
    },
  },
  mutations: {
    [PROGRESS_START_MUTATION](state, payload) {
      state.isProgress = true;
    },
    [PROGRESS_END_MUTATION](state, payload) {
      state.isProgress = false;
    },
  },
};
