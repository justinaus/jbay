<template>
  <div>
    <div>
      <Header />
      
      <Content>
        <slot />
      </Content>
      
      <Footer />
    </div>
    <Popup>
      <slot name="popup" />
    </Popup>
  </div>
</template>

<script>
import Header from './header/Header'
import Content from './content/Content'
import Footer from './footer/Footer'
import Popup from './popup/Popup'

export default {
  components: {
    Header,
    Content,
    Footer,
    Popup
  },
}
</script>