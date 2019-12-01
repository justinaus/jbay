import PageMixin from './PageMixin'

import ApiService from '@/services/ApiService'

import { makeQueryStringByObject } from 'jodash'

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action'

const ListPageMixin = {
  mixins: [
    PageMixin
  ],
  props: {
    maxRowCount: {
      type: Number,
      default: 10
    }
  },
  methods: {
    async getData() {
      // 임시.
      const path = `/todos`
      
      const strQuery = makeQueryStringByObject( this.$route.query );

      const result = await ApiService.shared.getData( path + strQuery );

      if( !result.list ) {
        this.$store.dispatch( SHOW_ALERT_ACTION );
        return;
      }
  
      console.log( result );
    },
  },
};

export default ListPageMixin;