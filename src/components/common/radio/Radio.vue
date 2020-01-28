<template>
  <div>
    <RadioItem
      v-for="(item, index) in dataList"
      :key="index"
      :name="name"
      :id="item.id"
      :text="item.text || item.id"
      :disabled="disabled || item.disabled"
      :selectedId.sync="selectedIdSync"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import RadioItem from './RadioItem';

export default {
  name: 'Radio',
  components: {
    RadioItem,
  },
  props: {
    dataList: Array,

    name: String,
    selectedId: undefined,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectedIdSync: {
      get() {
        return this.selectedId;
      },
      set(value) {
        this.$emit('update:selectedId', value);
      },
    },
  },
  methods: {
    onChange(to, from) {
      this.$emit('onChange', to, from);
    },
  },
};
</script>
