import { SHOW_ALERT_ACTION, HIDE_ALERT_ACTION } from './action';
import { SHOW_ALERT_MUTATION, HIDE_ALERT_MUTATION } from './mutation';

export default {
  state: {
    isVisible: false,
    title: null,
    text: null,
    btnPrimaryText: null,
    btnSecondaryText: null,
    onClickPrimary: null,
    onClickSecondary: null,
  },
  actions: {
    [SHOW_ALERT_ACTION](context, params) {
      this.commit({
        type: SHOW_ALERT_MUTATION,
        params: params,
      });
    },
    [HIDE_ALERT_ACTION](context) {
      this.commit({
        type: HIDE_ALERT_MUTATION,
      });
    },
  },
  mutations: {
    [SHOW_ALERT_MUTATION](state, payload) {
      const { params } = payload;

      state.text = params.text;

      state.title = params.title;
      state.btnPrimaryText = params.btnPrimaryText;
      state.btnSecondaryText = params.btnSecondaryText;

      state.onClickPrimary = params.onClickPrimary;
      state.onClickSecondary = params.onClickSecondary;

      state.isVisible = true;
    },
    [HIDE_ALERT_MUTATION](state, payload) {
      state.isVisible = false;
    },
  },
};
