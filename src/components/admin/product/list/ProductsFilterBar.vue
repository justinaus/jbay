<template>
  <div>
    <Radio name="radio0" :dataList="radioDatas" :selectedId.sync="radioId" />
    <Search
      :value.sync="inputValue"
      :dataList="searchDataList"
      @onSearch="onSearch"
      @onInputKeyword="onInputKeyword"
      @onSelectItem="onSelectItem"
    />
    <div>
      Status List
      <ul>
        <li v-for="item in statusList" :key="item.id">{{ item.text }}</li>
      </ul>
    </div>
    <div>
      Type List
      <ul>
        <li v-for="item in typeList" :key="item.id">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from '@/components/common/input/Search';
import Radio from '@/components/common/radio/Radio';
import { mapState } from 'vuex';

export default {
  components: {
    Search,
    Radio,
  },
  props: {
    defaultInputValue: String,
    defaultRadioId: String,
    radioDatas: Array,
  },
  data() {
    return {
      inputValue: this.defaultInputValue,
      radioId: this.defaultRadioId,
      searchDataList: [],
    };
  },
  computed: {
    ...mapState({
      statusList: state => state.product.statusList,
      typeList: state => state.product.typeList,
    }),
  },
  methods: {
    onSearch() {
      const inputValue = this.inputValue.trim();
      if (!inputValue) return;

      const ret = {
        radioId: this.radioId,
        inputValue: inputValue,
      };

      this.$emit('onSearch', ret);
    },
    onSelectItem(item) {
      this.inputValue = item.text;
    },
    onInputKeyword(value) {
      // api 호출.
      this.searchDataList = this.getDataFake();
    },
    getDataFake() {
      const length = Math.floor(Math.random() * 5);

      const ret = [];

      for (var i = 0; i < length; ++i) {
        const r = Math.random()
          .toString(36)
          .substring(7);
        const item = { id: i, text: r };
        ret.push(item);
      }

      return ret;
    },
  },
};
</script>

<style scoped>
ul {
  padding-left: 20px;
}
</style>
