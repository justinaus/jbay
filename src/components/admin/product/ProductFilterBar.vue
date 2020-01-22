<template>
  <div>
    <Radio
      :name="radioData.name"
      :dataList="radioData.dataList"
      :selectedId.sync="radioData.selectedId"
    />
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
  data() {
    return {
      inputValue: '',
      radioData: {
        name: 'radio0',
        dataList: [
          { id: 'id', text: 'id' },
          { id: 'userId', text: 'userId' },
          { id: 'title', text: 'title' },
          { id: 'completed', text: 'completed' },
        ],
        selectedId: 'title',
      },
    };
  },
  methods: {
    onSearch() {
      console.log('search', this.radioData.selectedId, this.inputValue);
    },
  },
};
</script>
