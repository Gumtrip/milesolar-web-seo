<template>
  <header id="header">
    <div class="wrapper">
      <div id="logo" class="flexPic">
        <router-link to="/">
          <img src="~/static/logo.png" alt="">
        </router-link>
      </div>
      <nav id="nav">
        <ul>
          <li v-for="(nav,key) in navList" :key="key" class="list">
            <router-link :to="nav.url" v-text="nav.title"></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      navList: [
        { title: 'Home', url: '/' },
        { title: 'Product', url: '/products' },
        { title: 'News', url: '/articles' },
        { title: 'Cases', url: '/cases' }
      ]

    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "../assets/css/variables";
  #header{box-sizing: border-box;padding: 10px 0;
    .wrapper{display: flex;justify-content: space-between;align-items: center}
  }
  #nav{flex: 0 0 60%;
    ul{display: flex}
    li{width: 100px}
    a{display: block;color: #333;font-size: 16px;font-family: "Open Sans Bold";font-weight: bold}
    a:hover{color: $main_green}
  }
  #logo{max-width: 150px}
</style>
