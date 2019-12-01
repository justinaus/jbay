<template>
  <div>
    <table>
      <!-- <colgroup>
        <slot name="colgroup" />
      </colgroup>
      <thead>
        <tr>
          <slot name="tr" />
        </tr>
      </thead> -->
      <tbody>
        <!-- <slot v-if="!this.dataList || this.dataList.length < 1" name="emptyList"></slot>
        <slot v-else name="rows"></slot> -->
        <template v-for="item in dataList">
          <slot name="row" :rowData="item" />
        </template>

      </tbody>
    </table>
    <Pagination
      v-if="showPagination"
      :startPageIndex='startPageIndex'
      :showPageCount='showPageCount'
      :selectedPageIndex='currentPageIndex'
      :enabledFirst='enabledFirst'
      :enabledEnd='enabledEnd'
      :enabledPrevPage='enabledPrevPage'
      :enabledNextPage='enabledNextPage'
      :enabledPrevGroup='enabledPrevGroup'
      :enabledNextGroup='enabledNextGroup'
      @onClickPageNum='onClickPageNum'
      @onClickEndPage='onClickEndPage'
      @onClickPrevGroup='onClickPrevGroup'
      @onClickNextGroup='onClickNextGroup' />
  </div>
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'Table',
  components: {
    Pagination
  },
  props: {
    dataList: Array,
    showPagination: {
      type: Boolean,
      default: true
    },
    currentPageIndex: Number,
    maxRowCount: Number,
    maxPaginationCount: Number,
    totalPageCount: Number,
    disableHover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    startPageIndex() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      const result = paginationGroupIndex * this.maxPaginationCount;
      return result;
    },
    showPageCount() {
      const endPageIndex = this.getEndPageIndex( this.startPageIndex );
      // if( endPageIndex < 0 )  return 0;

      const result = endPageIndex - this.startPageIndex + 1;
      return result;
    },
    enabledFirst() {
      return this.currentPageIndex !== 0;
    },
    enabledEnd() {
      const lastPageIndex = this.getLastPageIndex();
      
      return this.currentPageIndex !== lastPageIndex;
    },
    enabledPrevPage() {
      return this.currentPageIndex > 0;
    },
    enabledNextPage() {
      const lastPageIndex = this.getLastPageIndex();
      
      return this.currentPageIndex < lastPageIndex;
    },
    enabledPrevGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      return paginationGroupIndex > 0;
    },
    enabledNextGroup() {
      const currentGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );

      const lastPageIndex = this.getLastPageIndex();
      const lastPageGroupIndex = this.getPaginationGroupIndex( lastPageIndex );

      return currentGroupIndex < lastPageGroupIndex;
    }
  },
  methods: {
    getPaginationGroupIndex( pageIndex ) {
      const result = Math.floor( pageIndex / this.maxPaginationCount );
      return result;
    },
    getEndPageIndex( startPageIndex ) {
      // if( this.totalItemCount < 0 ) return -1;
      if( this.totalPageCount < 1 ) return 0;

      const lastPageIndex = this.getLastPageIndex();
      
      let maxPageIndex = startPageIndex + this.maxPaginationCount - 1;

      const result = Math.min( lastPageIndex, maxPageIndex );

      return result;
    },
    getLastPageIndex() {
      // if( this.totalItemCount < 0 ) return 0;
      if( this.totalPageCount < 1 ) return 0;

      const result = this.totalPageCount - 1;

      // const result = Math.floor( ( this.totalItemCount - 1 ) / this.maxRowCount );
      return result;
    },
    onChangePage( pageIndex ) {
      this.$emit( 'onChangePage', pageIndex );
    },
    onClickPageNum( pageIndex ) {
      this.onChangePage( pageIndex );
    },
    onClickEndPage() {
      const lastPageIndex = this.getLastPageIndex();

      if( lastPageIndex < 0 ) {
        return;
      }

      this.onChangePage( lastPageIndex );
    },
    onClickPrevGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );
      const toGroupIndex = paginationGroupIndex - 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
    },
    onClickNextGroup() {
      const paginationGroupIndex = this.getPaginationGroupIndex( this.currentPageIndex );
      const toGroupIndex = paginationGroupIndex + 1;

      this.onChangePage( toGroupIndex * this.maxPaginationCount );
    }
  }
}
</script>

<style scoped>
/* 리스트 table */
.tbl_list >>> table{width:100%}
.tbl_list >>> thead th:first-child,
.tbl_list >>> tbody td:first-child{padding-left:24px}
.tbl_list >>> thead th:last-child,
.tbl_list >>> tbody td:last-child{padding-right:24px}
.tbl_list >>> tbody td{height:32px;padding:8px 12px;border-bottom:1px solid #e1e1e1;line-height:18px;text-align:center;word-break:break-all;letter-spacing:-.02em}
.tbl_list >>> tbody td .link_subject{display:block;width:100%;text-align:left;text-decoration:underline}
.tbl_list >>> tbody td .link_point{font-weight:normal;font-family:'NotoSansKR_M', sans-serif;color:#5551CE}
/* 리스트 table_hover */
.tbl_list >>> tbody tr:hover td{background-color:#fbfbfb}
.tbl_list >>> tbody tr:hover td .link_subject{color:#5551CE}
/* 리스트 table_active */
.tbl_list >>> tbody .tr_select td{border-bottom-color:#5551CE;background:#fbfbfb url(/assets/images/bg_table_active.png) repeat-x;background-size:1px 1px}
.tbl_list >>> tbody .tr_select td:first-child{border-left:1px solid #5551CE}
.tbl_list >>> tbody .tr_select td:last-child{border-right:1px solid #5551CE}
.tbl_list >>> tbody .tr_select .link_subject{color:#5551CE}
.tbl_list >>> tbody .tr_select + .tr_select td{background:#fbfbfb}
/* 리스티 빈타입 */
.tbl_list >>> .td_empty{overflow:hidden;line-height:32px}
/* 노호버타입 */
.tbl_nohover >>> tbody tr:hover td{background-color:inherit}
.tbl_nohover >>> tbody tr:hover td .link_subject{color:inherit}
</style>
