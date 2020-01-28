<template>
  <div>
    <input
      type="radio"
      :name="name"
      :id="id"
      :value="id"
      :disabled="disabled"
      v-model="input"
      @change="onChange"
    />
    <label :for="id">{{ text }}</label>
  </div>
</template>

<script>
export default {
  name: 'RadioItem',
  props: {
    name: String, // radio name
    id: undefined,
    selectedId: undefined,
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    input: {
      get() {
        return this.selectedId;
      },
      set(value) {
        this.$emit('update:selectedId', value);
      },
    },
  },
  methods: {
    onChange(e) {
      const from = this.selectedId;
      const to = e.target.value;

      // console.log(from, to);

      this.$emit('onChange', to, from);
    },
  },
};
</script>
