<template>
  <div>
    <Input
      :placeholder="placeholder"
      :value.sync="input"
      :maxLength="maxLength"
      @onFocus="onFocus"
      @onBlur="onBlur"
      @onInput="onInput"
      @onEnterKeyUp="onEnterKeyUp"
      ref="input"
    />
    <button @click="onClickSearch">Search</button>
    <ul v-show="hasFocus" class="search_box">
      <li v-for="item in dataList" :key="item.id">
        <button @mousedown.prevent @click="onClickItem(item)">
          {{ item.text }}
        </button>
      </li>
      <li v-if="!dataList || dataList.length < 1">No Data</li>
    </ul>
  </div>
</template>

<script>
import Input from './Input';
import * as _ from 'lodash';

export default {
  name: 'Search',
  components: {
    Input,
  },
  props: {
    dataList: Array,
    value: String,
    placeholder: String,
    maxLength: Number,
    debounceDelay: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      hasFocus: false,
    };
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
  created() {
    this.debouncedQuery = _.debounce(
      function(value, delay) {
        this.query(value);
      }.bind(this),
      this.debounceDelay,
    );
  },
  methods: {
    onFocus(e) {
      this.hasFocus = true;
    },
    onBlur(e) {
      this.hasFocus = false;
    },
    onInput(e) {
      const strTrim = e.target.value.trim();
      this.debouncedQuery(strTrim, this.debounceDelay);
    },
    onEnterKeyUp(e) {
      this.$refs.input.blur();
      this.$emit('onSearch', this.value);
    },
    onClickSearch() {
      this.$emit('onSearch', this.value);
    },
    onClickItem(item) {
      this.$emit('onSelectItem', item);
      // Input 컴포넌트의 blur 메서드 호출.
      this.$refs.input.blur();
    },
    async query(value) {
      this.$emit('onInputKeyword', value);
    },
    // debouncedQuery: _.debounce(function(value) {
    //   this.query(value);
    // }, 300),
  },
};
</script>

<style scoped>
.search_box {
  position: absolute;
  border: 1px solid #555;
  background-color: #fff;
}
</style>
