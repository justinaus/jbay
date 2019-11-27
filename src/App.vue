<template>
  <div id="app">
    <router-view></router-view>
    <!-- 여기 공용 팝업.
    pagelayout을 안타는 페이지도 있다. ex) login, join.
     -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
