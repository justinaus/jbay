<template>
  <div>
    <div>
      <Header />
      
      <Content>
        <slot />
      </Content>
      
      <Footer />
    </div>
    <slot name="popup" />
    <PopAlert />
  </div>
</template>

<script>
import Header from './header/Header'
import Content from './content/Content'
import Footer from './footer/Footer'
import PopAlert from '@/components/common/PopAlert'

import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Content,
    Footer,
    PopAlert,
  },
  computed: {
    ...mapState({
      isPopAlertVisible: state => state.alert.isVisible,
      popAlertTitle: state => state.alert.title,
      popAlertText: state => state.alert.text,
      popAlertBtnPrimaryText: state => state.alert.btnPrimaryText,
      popAlertBtnSecondaryText: state => state.alert.btnSecondaryText,
      onClickPopAlertPrimary: state => state.alert.onClickPrimary,
      onClickPopAlertSecondary: state => state.alert.onClickSecondary,
    }),
  }
}
</script>