<template>
  <div>
    <Radio name="radio0" :dataList="radioDatas" :selectedId.sync="radioId" />
    <Input :value.sync="inputValue" @onEnterKeyUp="onSearch" />
    <button @click="onSearch">Search</button>
  </div>
</template>

<script>
import Input from '@/components/common/input/Input';
import Radio from '@/components/common/radio/Radio';

export default {
  components: {
    Input,
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
    };
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
  },
};
</script>
