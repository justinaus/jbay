import { SHOW_ALERT_ACTION, HIDE_ALERT_ACTION } from './action'
import { SHOW_ALERT_MUTATION, HIDE_ALERT_MUTATION } from './mutation'

export default {
  state: {
    isVisible: false,
    title: 'alert',
    text: null,
    btnPrimaryText: 'ok',
    btnSecondaryText: 'cancel',
    onClickPrimary: null,
    onClickSecondary: null,
  },
  actions: {
    [ SHOW_ALERT_ACTION ]( context, params ) {
      this.commit({
        type: SHOW_ALERT_MUTATION,
        params: params,
      });
    },
    [ HIDE_ALERT_ACTION ]( context ) {
      this.commit({
        type: HIDE_ALERT_MUTATION,
      });
    },
  },
  mutations: {
    [ SHOW_ALERT_MUTATION ]( state, payload ) {
      const { params } = payload;

      state.text = params.text;

      state.btnPrimaryText = params.btnPrimaryText || 'ok';
      state.btnSecondaryText = params.btnSecondaryText || 'cancel';

      state.onClickPrimary = () => {
        state.isVisible = false;

        if( params.onClickPrimary ) {
          params.onClickPrimary();
        }
      }

      state.onClickSecondary = () => {
        state.isVisible = false;

        if( params.onClickSecondary ) {
          params.onClickSecondary();
        }
      }

      state.isVisible = true;
    },
    [ SHOW_ALERT_MUTATION ]( state, payload ) {
      state.isVisible = false;
    }
  }
}