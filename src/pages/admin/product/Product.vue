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
    <div>
      <FileView />
      <FileWrite />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import PageMixin from '@/mixins/PageMixin';

import FileView from '@/components/common/file/FileView';
import FileWrite from '@/components/common/file/FileWrite';

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import http from '@/services/http';

export default {
  mixins: [PageMixin],
  components: {
    PageLayout,
    FileView,
    FileWrite,
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
