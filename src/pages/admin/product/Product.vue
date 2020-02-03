<template>
  <PageLayout>
    <div>id: {{ model.id }}</div>
    <div>userId: {{ model.userId }}</div>
    <div>
      title:
      <Input :value.sync="model.title" />
    </div>
    <div>completed: {{ model.completed }}</div>
    <!-- /src -->
    <img alt="Vue logo" src="@/assets/logo.png" />
    <!-- /public -->
    <img src="/assets/images/test.png" />
    <div>
      <FileView />
      <FileWrite />
    </div>
    <button @click="onClickSave">Save</button>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import PageMixin from '@/mixins/PageMixin';

import FileView from '@/components/common/file/FileView';
import FileWrite from '@/components/common/file/FileWrite';
import Input from '@/components/common/input/Input';

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import http from '@/services/http';

import ProductModel from './ProductModel';

export default {
  mixins: [PageMixin],
  components: {
    PageLayout,
    FileView,
    FileWrite,
    Input,
  },
  data() {
    return {
      model: new ProductModel(),
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
          // this.itemData = response.data;
          this.model.setData(response.data);
        })
        .catch(error => {
          this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(error) });
        });
    },
    onClickSave() {
      const obj = this.model.getData();

      console.log('save!', obj);
    },
  },
};
</script>
