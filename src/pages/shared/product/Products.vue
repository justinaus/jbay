<template>
  <component :is="appropriateComponent"></component>
</template>

<script>
import SharedPageMixin from '@/mixins/SharedPageMixin';

export default {
  mixins: [SharedPageMixin],
  components: {
    AdminComponent: () => import('@/pages/admin/product/Products'),
    UserComponent: () => import('@/pages/user/product/Products'),
  },
  computed: {
    appropriateComponent() {
      return this.isAdmin ? 'AdminComponent' : 'UserComponent';
    },
  },
};
</script>
