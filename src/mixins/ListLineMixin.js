import { makeQueryStringByObject } from 'jodash'

const ListLineMixin = {
  methods: {
    getDetailPagePath( routerPath, id ) {
      const strQuery = makeQueryStringByObject( this.$route.query );

      const path = `${ routerPath }/${ id }${ strQuery }`
      return path;
    }
  }
};

export default ListLineMixin;