<template>
  <PageLayout>
    <div>id: {{ itemData && itemData.id }}</div>
    <div>userId: {{ itemData && itemData.userId }}</div>
    <div>title: {{ itemData && itemData.title }}</div>
    <div>
      body:
      <span v-html="itemData && itemData.body" />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import PageMixin from '@/mixins/PageMixin';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import http from '@/services/http';

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
      const path = `${this.$apiPath.BIDS}/${id}`;

      http
        .get(path)
        .then(response => {
          this.itemData = response.data;
        })
        .catch(error => {
          this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(error) });
        });
    },
  },
};
</script>
