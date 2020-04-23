<template>
  <div class="wrapper inner">
    <Bread :breads="breadList"></Bread>
    <div id="productsBox">
      <section id="filter" class="left">
        <Cate></Cate>
      </section>
      <section class="right">
        <h3 id="rightBoxTitle">Products</h3>
        <ul id="contentBox" v-loading="loading">
          <li v-for="(product,key) in products" :key="key" class="item">
            <nuxt-link :to="{name:'products-id',params:{id:product.id}}">
              <div class="flexPic pic">
                <img :src="product.main_image" alt="">
              </div>
              <h5 class="title" v-text="product.title"></h5>
            </nuxt-link>
          </li>
        </ul>
        <div v-show="more_data" class="text_center">
          <el-button :loading="loading" type="primary" @click="getProducts">MORE PRODUCTS</el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import Cate from './components/Cate'
import { products, productCategory } from '~/plugins/http'

export default {
  name: 'List',
  components: { Bread, Cate },
  data() {
    return {
      products: [],
      productCategory: {},
      cateTitle: 'ALL',
      loading: true,
      more_data: true,
      page: 1,
      postData: {},
      popupVisible: false,
      breadList: [
        { title: 'Products', url: '/products' }
      ]
    }
  },
  computed: {},
  watch: {
    $route() {
      this.postData.category_id = this.$route.query.category_id
      this.resetData()
      this.getProducts()
    }
  },
  created() {
    this.postData.category_id = this.$route.query.category_id
    if (this.$route.query.category_id) {
      this.getCategory(this.$route.query.category_id)
    }
    this.getProducts()
  },
  methods: {
    async getProducts() {
      if (this.more_data) {
        this.loading = true
        const res = await products({
          filter: this.postData,
          page: this.page
        })
        if (res.data) {
          this.products = this.products.concat(res.data.data)
          if (res.data.meta.current_page >= res.data.meta.last_page) {
            this.more_data = false
          }
          this.page++
          this.loading = false
        }
      }
    },
    async getCategory(id) {
      const cat = await productCategory(id)
      this.productCategory = cat.data
    },
    resetData() {
      this.products = []
      this.more_data = true
      this.page = 1
    }
  },
  head() {
    const category = this.productCategory
    if (category) {
      return {
        title: category.seo_title,
        meta: [
          { hid: 'keywords', name: 'keywords', content: category.seo_keywords },
          { hid: 'description', name: 'description', content: category.seo_desc }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #productsBox{display: flex;justify-content: space-between;
    .left{flex: 0 0 25%}
    .right{flex: 0 0 68%;}
  }

  #contentBox{
    margin-top:34px ;
    box-sizing: border-box;;display: flex;flex-wrap: wrap;
    .item{flex: 0 0 33.333%;box-sizing: border-box;margin-bottom: 30px;padding-right:10px;overflow: hidden;
      a{display: block;border: 1px solid #eee;padding-bottom: 10px}
    }
    .pic{margin-bottom: 10px;height: 168px;}
    .title{font-size: 16px;color: #000;width: 90%;margin: 0 auto;font-family: "Open Sans Bold";height: 56px;overflow: hidden}
  }

  #rightBoxTitle{
    height: 37px;
    line-height: 37px;
    font-size: 24px;
    color: #000;}
</style>
