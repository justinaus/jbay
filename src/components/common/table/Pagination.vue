<template>
  <div class="pagination">
    <button :disabled="!enabledFirst" @click="onClickFirstPage">first</button>
    <button :disabled="!enabledPrevGroup" @click="onClickPrevGroup">
      prev group
    </button>
    <button :disabled="!enabledPrevPage" @click="onClickPrevPage">
      prev page
    </button>
    <button
      v-for="n in showPageCount"
      :key="n"
      :class="{ current_page: selectedPageIndex === startPageIndex + n - 1 }"
      @click="() => onClickNum(startPageIndex + n - 1)"
    >
      {{ startPageIndex + n }}
    </button>
    <button :disabled="!enabledNextPage" @click="onClickNextPage">
      next page
    </button>
    <button :disabled="!enabledNextGroup" @click="onClickNextGroup">
      next group
    </button>
    <button :disabled="!enabledEnd" @click="onClickEndPage">end</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    startPageIndex: Number,
    showPageCount: Number,
    selectedPageIndex: Number,
    enabledFirst: Boolean,
    enabledEnd: Boolean,
    enabledPrevPage: Boolean,
    enabledNextPage: Boolean,
    enabledPrevGroup: Boolean,
    enabledNextGroup: Boolean,
  },
  methods: {
    dispatchPageClicked(toPageIndex) {
      this.$emit('onClickPageNum', toPageIndex);
    },
    onClickNum(pageIndex) {
      this.dispatchPageClicked(pageIndex);
    },
    onClickNextPage() {
      this.dispatchPageClicked(this.selectedPageIndex + 1);
    },
    onClickPrevPage() {
      this.dispatchPageClicked(this.selectedPageIndex - 1);
    },
    onClickFirstPage() {
      this.dispatchPageClicked(0);
    },
    onClickEndPage() {
      this.$emit('onClickEndPage');
    },
    onClickPrevGroup() {
      this.$emit('onClickPrevGroup');
    },
    onClickNextGroup() {
      this.$emit('onClickNextGroup');
    },
  },
};
</script>
<style>
.pagination .current_page {
  background-color: green;
}
</style>
