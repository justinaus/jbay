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

export default {
  components: {
    Header,
    Content,
    Footer,
    PopAlert,
  },
}
</script>