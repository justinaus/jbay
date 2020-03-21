import { shallowMount } from '@vue/test-utils';

import Vue from 'vue';

import Input from '@/components/common/input/Input';

describe('Input.vue', () => {
  it('have props, render by props', () => {
    const obj = {
      value: 'value test',
      disabled: true,
      isError: true,
    };
    const wrapper = shallowMount(Input, {
      propsData: obj,
    });

    const input = wrapper.find('input');

    expect(input.element.value).toBe(obj.value);
    expect(input.element.disabled).toBe(obj.disabled);
    expect(wrapper.classes('error')).toBe(obj.isError);
  });

  it('has maxlength props, change text length', async () => {
    const obj = {
      value: 'value test',
      maxLength: 3,
    };
    const wrapper = shallowMount(Input, {
      propsData: obj,
    });

    // v-model 값이 안바뀐다. 차선책을 쓴다.
    const emittedInputValue = wrapper.emitted()['update:value'];

    if (emittedInputValue) {
      wrapper.setProps({ value: emittedInputValue[0][0] });

      await Vue.nextTick();
    }

    expect(wrapper.find('input').element.value.length).toBeLessThanOrEqual(
      obj.maxLength,
    );
  });
});
