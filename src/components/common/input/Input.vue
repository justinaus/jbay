<template>
  <input
    v-model="input"
    :type="type"
    :placeholder="placeholder"
    :maxLength="maxLength"
    :disabled="disabled"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    ref="input"
    v-on:keyup.13="onEnterKeyUp"
  />
</template>

<script>
// input에 대한 공통 스타일 여기에 정의.

export default {
  props: {
    value: String,
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    maxLength: Number,
  },
  computed: {
    input: {
      get() {
        if (this.maxLength && this.value.length > this.maxLength) {
          this.$emit('update:value', this.value.slice(0, this.maxLength));
        }

        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
  methods: {
    blur() {
      // 외부에서 호출 될 메서드.
      this.$refs.input.blur();
    },
    onFocus(e) {
      this.$emit('onFocus', e);
    },
    onBlur(e) {
      this.$emit('onBlur', e);
    },
    onEnterKeyUp(e) {
      this.$emit('onEnterKeyUp', e);
    },
    onInput(e) {
      this.$emit('onInput', e);
    },
  },
};
</script>
