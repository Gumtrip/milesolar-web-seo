<template>
  <div class="wrapper inner">
    <Bread :breads="breadList"></Bread>
    <div v-if="product" id="productDetail">
      <section id="picGallery">
        <el-carousel trigger="click" :interval="5000" indicator-position="outside">
          <el-carousel-item v-for="(img,key) in product.mid_image_group" :key="key">
            <div class="flexPic">
              <img :src="img">
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section id="proInfo">
        <h1 class="proTitle" v-text="product.title"></h1>
        <p class="desc" v-text="product.brief"></p>
        <div class="BtnContainer">
          <nuxt-link :to="{name:'contact',query:{product_id:id}}">
            <el-button id="inquiryBtn" size="medium" type="primary">Inquiry</el-button>
          </nuxt-link>
        </div>
      </section>
    </div>
    <section>
      <el-tabs v-if="product.info_group" v-model="selected" class="contentContainer">
        <el-tab-pane class="tabTitle" label="Feature" name="info_0_m">
          <div class="description" v-html="product.info_group.info_0_m"></div>
        </el-tab-pane>
        <el-tab-pane class="tabTitle" label="Specification" name="info_1_m">
          <div class="description" v-html="product.info_group.info_1_m"></div>
        </el-tab-pane>
        <el-tab-pane class="tabTitle" label="Application" name="info_2_m">
          <div class="description" v-html="product.info_group.info_2_m"></div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import { product } from '~/plugins/http'

export default {
  name: 'Show',
  components: { Bread },
  data() {
    return {
      selected: 'info_0_m',
      product: '',
      meta: {},
      id: null,
      breadList: [
        { title: 'Products', url: '/products' }
      ]
    }
  },
  computed: {},
  created() {
    const params = this.$route.params
    this.id = params.id
    this.getProduct(this.id)
  },
  methods: {
    getProduct(id) {
      product(id, {
        'append': 'mid_image_group,info_group'
      }).then((response) => {
        this.product = response.data
      })
    }
  },
  head() {
    const product = this.product
    return {
      title: product.seo_title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: product.seo_keywords },
        { hid: 'description', name: 'description', content: product.seo_desc }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/_variables";
  #productDetail{display: flex;margin-bottom: 40px;justify-content: space-between;
    #picGallery{flex: 0 0 40%;
      .flexPic{height: 100%}
      img{max-width: 100%;height: 100%}
    }
    .proTitle{color: #5d5d5d;font-size: 24px}
    .desc{color: #888;margin: 20px 0;font-size: 16px;line-height: 150%;
    }
    #proInfo{flex: 0 0 55%}
  }
  .contentContainer /deep/{
    .el-tabs__item{
      font-size: 20px;
    }
    .el-tabs__item.is-active,.el-tabs__item:hover{color: $main_green}
    .el-tabs__active-bar{background-color:$main_green }
    img{max-width: 100%;max-height: 100%}
  }
</style>
