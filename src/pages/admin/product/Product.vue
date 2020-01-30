<template>
  <PageLayout>
    <div>id: {{ itemData && itemData.id }}</div>
    <div>userId: {{ itemData && itemData.userId }}</div>
    <div>title: {{ itemData && itemData.title }}</div>
    <div>completed: {{ itemData && itemData.completed }}</div>
    <!-- /src -->
    <img alt="Vue logo" src="@/assets/logo.png" />
    <!-- /public -->
    <img src="/assets/images/test.png" />
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import PageMixin from '@/mixins/PageMixin';
import ApiService from '@/services/ApiService';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  mixins: [PageMixin],
  components: {
    PageLayout,
  },
  data() {
    return {
      itemData: null,
    };
  },
  beforeMount() {
    const { id } = this.$route.params;

    if (!id) return;

    this.getData(id);
  },
  methods: {
    async getData(id) {
      const path = `${this.$apiPath.PRODUCTS}/${id}`;

      const result = await ApiService.shared.getData(path);

      if (!result.data) {
        this.itemData = null;
        this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(result) });
        return;
      }

      this.itemData = result.data;
    },
  },
};
</script>
