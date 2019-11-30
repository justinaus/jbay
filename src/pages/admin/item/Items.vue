<template>
  <PageLayout>
    items
    <b-button @click="onClick">test</b-button>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>

    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
    <div>akfdajldfjk</div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'

import ListPageMixin from '@/mixins/ListPageMixin'

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action'

export default {
  mixins: [
    ListPageMixin,
  ],
  components: {
    PageLayout,
  },
  methods: {
    onClick() {
      const params = {
        text: 'this is test.',
        onClickPrimary: () => {
          console.log( 123 );
        }
      }
      this.$store.dispatch( SHOW_ALERT_ACTION, params );
    }
  }
}
</script>