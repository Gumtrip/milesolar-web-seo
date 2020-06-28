<template>
  <header id="header">
    <div class="wrapper">
      <el-row id="headerRow">
        <el-col :span="4">
          <div id="logo" class="flexPic">
            <nuxt-link to="/">
              <img src="@/static/logo.png" alt="">
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form id="searchForm" :inline="true" :model="postForm">
            <el-form-item>
              <el-input v-model="postForm.keywords" placeholder="SEARCH WHAT YOU WANT!"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">SEARCH</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="contactItem" :span="6">
          <a href="mailto:milly@milesolar.com"><i class="fa fa-envelope-o"></i><span>milly@milesolar.com</span></a>
        </el-col>
        <el-col class="contactItem" :span="6">
          <a href="tel:008613889943867"><i class="fa fa-phone"></i><span>0086 13889943867</span></a>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper">
      <nav id="nav">
        <el-row>
          <el-col v-for="(nav,key) in navList" :key="key" :span="4" class="list">
            <nuxt-link :to="nav.url" v-text="nav.title"></nuxt-link>
          </el-col>
        </el-row>
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
        { title: 'Products', url: '/products' },
        { title: 'About Us', url: '/articles/1/about-us' },
        { title: 'Cases', url: '/cases' },
        // { title: 'Blog', url: '/articles' },
        { title: 'Contact', url: '/contact' }
      ],
      postForm: {
        keywords: ''
      }
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
    #headerRow{align-items: center;display: flex;margin-bottom: 10px}
    .contactItem .fa{margin-right: 8px}
  }
  #nav{margin-bottom: 10px;
    a{display: block;color: #333;font-size: 26px;font-family: "Open Sans Bold";font-weight: bold}
    a:hover{color: $main_green}
  }
  #searchForm {
    display: flex;align-items: center;
  }
  #searchForm /deep/{
    .el-form-item{margin-bottom: 0}
    .el-button--primary{background-color: $main_green }
    .el-input{width: 250px}
  }
  #logo{max-width: 150px}
</style>
