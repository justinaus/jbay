<template>
  <div>
    <div>
      <Header />

      <hr />

      <Content>
        <slot />
      </Content>

      <hr />

      <Footer />
    </div>
    <slot name="popup" />
    <!-- 공용 팝업은 App.vue로 옮김. -->
  </div>
</template>

<script>
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';

export default {
  components: {
    Header,
    Content,
    Footer,
  },
};
</script>
