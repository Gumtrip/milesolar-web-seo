<template>
  <div class="container">
    <section id="banner">
      <swiper ref="mySwiper">
        <swiper-slide v-for="(banner,key) in banners" :key="key">
          <router-link :to="banner.url" class="bannerImg">
            <img src="../static/banner.png" alt="Power inverter, MPPT controller, off-grid solar system, MILESOLAR">
          </router-link>
        </swiper-slide>
      </swiper>
    </section>
    <div class="wrapper">
      <section id="indexCategories">
        <el-row :gutter="20">
          <el-col v-for="(category,key) in product_categories" :key="key" :span="6" >
            <el-card>
              <router-link :to="{name:'products',query:{category_id:category.id}}" class="cateBox">
                <h3 class="text_center cate_title" v-text="category.title"></h3>
                <div class="cate_pic flexPic">
                  <img :src="category.mid_img" :alt="category.title">
                </div>
              </router-link>
              <p class="cateBrief" v-text="category.brief"></p>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <section v-if="indexProducts" type="flex" id="featureProducts">
        <h3 class="text_center title">FEATURED PRODUCTS</h3>
        <el-row id="featureContainer" :gutter="20">
          <el-col v-for="(product,key) in indexProducts" :key="key" :span="6">
            <div class="border-round itemBox">
              <nuxt-link :to="{name:'products-id-slug',params:{id:product.id,slug:product.slug}}">
                <div class="flexPic">
                  <img :src="product.main_image" alt="">
                </div>
              </nuxt-link>
            </div>
          </el-col>
        </el-row>
      </section>

      <section v-if="aboutsUs" id="aboutUs">
          <div class="rightBox">
            <div v-if="aboutsUs[0]" id="imgBox">
              <div id="imgZoom" class="flexPic">
                <img :src="aboutsUs[0].mid_img" :alt="aboutsUs[0].title">
              </div>
            </div>
          </div>

          <div class="leftBox">
            <h3 id="mainTitle">About MILESOLAR</h3>
            <div class="txtBox" v-text="aboutsUs[0].intro"></div>
            <el-row id="btnGroup">
              <el-col :span="8"><a href=""><el-button type="primary">LinkedIn</el-button></a></el-col>
              <el-col :span="8"><a href=""><el-button type="primary">FaceBook</el-button></a></el-col>
              <el-col :span="8"><a href=""><el-button type="primary">WhatApp</el-button></a></el-col>
            </el-row>
          </div>
      </section>
      <section v-if="samples" id="indexCase">
        <h3 class="text_center title">Customer Cases</h3>
        <el-row :gutter="20">
          <el-col v-for="(sample,key) in samples" :key="key" :span="8">
            <el-card class="item">
              <nuxt-link :to="{name:'cases-id-slug',params:{id:sample.id,slug:sample.slug}}">
                <div class="flexPic">
                  <img :src="sample.mid_img" alt="">
                </div>
              </nuxt-link>
            </el-card>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
import { productCategories, samples, articles, products } from '@/plugins/http'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { APP_URL, TITLE } from '~/seo.config'
import 'swiper/css/swiper.css'

export default {
  components: { Swiper, SwiperSlide
  },
  async asyncData() {
    // 产品分类
    const res = await productCategories({
      take: 4,
      sort: 'default'
    })
    // 首页案例
    const res1 = await samples({
      filter: { is_index: 1 },
      take: 3
    })
    console.log(res1.data)
    // 关于我们
    const res2 = await articles({
      category_id: 2,
      take: 3,
      sort: 'id'
    })
    // feature products
    const res3 = await products({
      filter:{is_index:1},
      take:8
    })

    return { product_categories: res.data,
      samples: res1.data,// 首页案例
      aboutsUs: res2.data,// 关于我们
      indexProducts: res3.data// feature products
    }
  },
  data() {
    return {
      product_categories: [],
      indexProducts: [],
      samples: [],
      aboutsUs: [],
      selected: 'tab-0', // 首页about us选项卡
      bannerHeight: '500',
      banners: [
        { image: '../static/banner-1.jpg', url: '/' }
      ]
    }
  },
  async created() {

  },
  methods: {
    getCategories() {
      productCategories({
        take: 4,
        sort: 'default'
      }).then((response) => {
        this.product_categories = response.data
      })
    },
    getNews() {
      articles({
        filter: { is_index: 1 },
        take: 3
      }).then((response) => {
        this.articles = response.data
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
  },
  head() {
    return {
      script: [{
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': '1',
              'name': 'Index',
              'item': APP_URL
            }
          ]
        }
      },
      {
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': TITLE,
          'image': [
            APP_URL + '/logo.png'
          ]
        }
      }

      ]
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/css/_variables.scss";
  #banner {
    a{display: block;text-align: center;}
    .bannerImg{width: 100%}
    .bannerImg img{max-width: 100%}
  }
  #indexCategories{max-width: 1920px;margin:20px auto 16px auto;
    .cateBox{;box-sizing: border-box;height: 330px;}
    .cate_title{ box-sizing: border-box;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;
      h3{font-size: 30px;color: #9d9d9d;margin-bottom: 20%;height: 100px;overflow: hidden}
    }
    .cate_pic{height: 260px;margin-bottom: 10px}
    .cateBrief{font-size: 16px;height: 74px;overflow: hidden}
  }

  #featureProducts{
    .title{font-size: 32px;margin-bottom: 10px}
    .itemBox{padding: 1rem;;height: 300px;overflow: hidden;margin-bottom: 20px}
    .flexPic{height: 300px}
  }
  #aboutUs{box-sizing: border-box;display: flex;justify-content: space-between;margin-bottom: 20px;
    .rightBox{flex: 0 0 42%}
    .leftBox{flex: 0 0 54%}
    .txtBox{margin-bottom: 10px}
    #imgBox{padding: 0 10px;}

    #mainTitle{font-size: 36px;margin-bottom: 30px;color: #151515;}
    #subTitle{margin: 15px 0;
      font-size: 16px;
      color: #727272;
    }
    #detailInfo{margin: 25px 0 0;}
    .mint-navbar .mint-tab-item.is-selected{border-bottom-color: $main_green}
    .a_Title ::v-deep{ .mint-tab-item-label{font-size: 16px;color: #9b9b9b;}}
    .txtBox{line-height: 170%;
      font-size: 16px;
      color: #9b9b9b;}
  }

  #indexCase{margin-bottom: 30px;
    .title{font-size: 32px;margin-bottom: 20px}
    .item{}
    .flexPic{height: 300px;overflow: hidden}
  }
</style>
