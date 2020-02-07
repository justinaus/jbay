import LocalStorageManager from '@/LocalStorageManager';

const SharedPageMixin = {
  computed: {
    isAdmin() {
      const ret = LocalStorageManager.shared.getIsAdmin();
      return ret;
    },
  },
};

export default SharedPageMixin;
