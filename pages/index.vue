<template>
  <div class="container">
    <section id="banner">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="(banner,key) in banners" :key="key">
          <router-link v-if="banner.value" to="/" class="bannerImg">
            <img  :src="baseUrl + banner.value" alt="Power inverter, MPPT controller, off-grid solar system, MILESOLAR">
          </router-link>
        </swiper-slide>
      </swiper>
    </section>
    <div class="wrapper">
      <section id="indexCategories">
        <el-row :gutter="20">
          <el-col v-for="(category,key) in product_categories" :key="key" :span="6">
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

      <section  id="featureProductsContainer">
        <Products></Products>
      </section>
<!--關於我們-->
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
      <!--關於我們-->
<!--      首页案例-->
      <section id="indexCasesContainer">
        <Cases></Cases>
      </section>
      <section id="contactUsInfo" class="mt30">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="12"><contactForm :simple="true"></contactForm></el-col>
            <el-col :span="12">
              <contactInfo></contactInfo>
            </el-col>
          </el-row>
        </el-card>
        <!--      首页案例-->
      </section>
    </div>
  </div>
</template>
<script>
import { productCategories, articles, settings } from '@/plugins/http'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { APP_URL, TITLE } from '~/seo.config'
import 'swiper/css/swiper.css'
import Cases from '@/components/index/cases'
import Products from '@/components/index/products'
import contactForm from './contact/contactForm'
import contactInfo from './contact/contactInfo'

export default {
  components: { Swiper, SwiperSlide, Cases, contactForm, contactInfo, Products
  },
  async asyncData() {
    // 产品分类
    const res = await productCategories({
      take: 4,
      sort: 'default'
    })
    // 关于我们
    const res2 = await articles({
      category_id: 2,
      take: 3,
      sort: 'id'
    })
    const res3 = await settings({
      filter: { category_id:1},
    })
    return {
      product_categories: res.data,
      aboutsUs: res2.data, // 关于我们
      banners: res3.data, // banners
    }
  },
  data() {
    return {
      product_categories: [],
      aboutsUs: [],
      bannerHeight: '500',
      banners: [],
      baseUrl:process.env.baseUrl,
      swiperOption:{
        //自动轮播
        autoplay: {
          delay: 2000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false,
        },
        loop:true
      }
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
<style lang="scss" scoped>
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

  #featureProductsContainer{margin-bottom: 20px}

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
  .mt30{margin-bottom: 30px}
  #indexCasesContainer{margin-bottom: 30px}
  #contactUsInfo ::v-deep{
    .fa{display: inline-block;width: 40px;text-align: center;font-size: 26px}
    p,a{padding-left: 40px}

    .list{;margin-bottom: 20px;
      .label{font-size: 28px}
      .info{font-size: 28px}
    }
  }
</style>
