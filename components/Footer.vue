<template>
  <footer id="footer">
    <ul class="wrapper">
      <li class="logo navList">
        <nuxt-link to="/">
          <img src="~/static/logo.png" alt="">
        </nuxt-link>
      </li>
      <li class="navList product">
        <h3>PRODUCTS</h3>
        <ul v-if="product_categories">
          <li>
            <h4><nuxt-link to="/products">ALL PRODUCTS</nuxt-link> </h4>
          </li>
          <li v-for="(category,key) in product_categories" :key="key">
            <h4><nuxt-link :to="{name:'products',query:{category_id:category.id}}" v-text="category.title"></nuxt-link> </h4>
          </li>
        </ul>
      </li>
      <li class="navList">
        <h3>ABOUT US</h3>
        <ul>
          <li v-for="(article,key) in aboutsUs" :key="key">
            <h4><nuxt-link :to="{name:'articles-id-slug',params:{id:article.id,slug:article.slug}}" v-text="article.title"></nuxt-link> </h4>
          </li>

        </ul>
      </li>
      <li class="navList">
        <h3>CONTACT US</h3>
        <ul>
          <li>
            <h4><nuxt-link :to="{name:'contact'}">CONTACT US</nuxt-link> </h4>
          </li>
        </ul>
      </li>
      <li id="contactUs">
        <contactInfo></contactInfo>
      </li>
    </ul>
  </footer>
</template>

<script>
import { productCategories, articles } from '~/plugins/http'
import contactInfo from '@/pages/contact/contactInfo'

export default {
  name: 'Footer',
  components: {contactInfo},
  data() {
    return {
      product_categories: [],
      aboutsUs: []
    }
  },
  computed: {},
  created() {
    this.getCategories()
    this.getAboutUs()
  },
  methods: {
    getCategories() {
      productCategories({
        depth: 1,
        take: 4,
        sort: 'default'
      }).then((response) => {
        this.product_categories = response.data
      })
    },
    getAboutUs() {
      articles({
        category_id: 2,
        take: 3,
        sort: 'id'
      }).then((response) => {
        this.aboutsUs = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variables";
  #footer{background: #343434;padding-top: 10px;overflow: hidden;
    .wrapper{display: flex;padding-top: 20px}
    .logo img{max-width: 150px}
    .navList{flex:0 0  15%;;padding-bottom:10px;margin-bottom: 10px;box-sizing: border-box;}
    .product{flex: 0 0 30%}

    h3{position: relative;padding-bottom: 10px;color: #fff;font-size: 18px;text-transform: uppercase;margin-bottom: 15px;}
    h3:after{border-bottom: 1px solid $main_green;width: 60px;
      height: 3px;
      background: $main_green;
      position: absolute;
      left: 0;
      top: 100%;
      content: '';}
    h4{
      a{display: block;
        font-size: 16px;
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        color: #a9a9a9;
      }
    }
  }
  #contactUs ::v-deep{
    span{color: #fff;font-size: 16px;}
    a,p{margin-bottom: 10px}
    #listBox a,#listBox p{padding-left: 30px;}
    i{font-size: 18px}
    .fa.fa-mobile{font-size: 22px}
    #listBox .icon{top: 0}
  }
</style>
