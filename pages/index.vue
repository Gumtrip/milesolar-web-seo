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
            <router-link :to="{name:'products',query:{category_id:category.id}}" class="cateBox">
              <h3 class="text_center cate_title" v-text="category.title"></h3>
              <div class="cate_pic flexPic">
                <img :src="category.mid_img" :alt="category.title">
              </div>
            </router-link>
            <p class="cateBrief" v-text="category.brief"></p>

          </el-col>
        </el-row>
      </section>

      <section id="featureProducts">
        <h3 class="text_center title">FEATURED PRODUCTS</h3>
        <el-row>
          <el-col v-for="(product,key) in indexProducts" :key="key" :span="6">
            <nuxt-link :to="{name:'products-id-slug',params:{id:product.id,slug:product.slug}}">
              <div class="flexPic">
                <img :src="product.main_image" alt="">
              </div>
            </nuxt-link>
          </el-col>
        </el-row>
      </section>
      <section v-if="aboutsUs" id="aboutUs">
        <div class="leftBox">
          <h4 id="subTitle">A FEW WORDS ABOUT US</h4>
          <h3 id="mainTitle">A FEW WORDS ABOUT US</h3>
          <div>
            <el-tabs id="detailInfo" v-model="selected">
              <el-tab-pane v-for="(item,key) in aboutsUs" :key="key" :label="item.title" :name="'tab-'+key">
                <p class="txtBox" v-text="item.intro"></p>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="rightBox">
          <div v-if="aboutsUs[0]" id="imgBox">
            <div id="imgZoom" class="flexPic">
              <img :src="aboutsUs[0].mid_img" :alt="aboutsUs[0].title">
            </div>
            <div class="top">
              <span class="left block"></span>
              <span class="right block"></span>
            </div>
            <div class="bottom">
              <span class="left block"></span>
              <span class="right block"></span>
            </div>
          </div>
        </div>
      </section>
      <section id="indexNews">
        <li v-for="(article,key) in articles" :key="key" class="list">
          <router-link :to="{name:'articles-id-slug',params:{id:article.id,slug:article.slug}}">
            <div class="txt">
              <div class="newIcon">
                <span>News</span>
              </div>
              <h3 class="newTitle" v-text="article.title"></h3>
              <div class="newDate" v-text="article.create_date"></div>
            </div>
            <div class="newPic picBox">
              <div class="pic">
                <img :src="article.sm_img" :alt="article.title">
              </div>
              <span></span>
            </div>
          </router-link>
        </li>
      </section>
    </div>
  </div>
</template>

<script>
import { productCategories, articles, products } from '@/plugins/http'
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
    // 首页文章
    const res1 = await articles({
      filter: { is_index: 1 },
      take: 3
    })
    // 关于我们
    const res2 = await articles({
      category_id: 2,
      take: 3,
      sort: 'id'
    })
    const res3 = await products({
      filter: { is_index: 1 }
    })
    console.log(res3.data.data)
    return { product_categories: res.data,
      articles: res1.data,
      aboutsUs: res2.data,
      indexProducts: res3.data.data
    }
  },
  data() {
    return {
      product_categories: [],
      articles: [],
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
  #indexCategories{max-width: 1920px;margin:10px auto 0 auto;
    .cateBox{;box-sizing: border-box;height: 330px; }
    .cate_title{ box-sizing: border-box;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;
      h3{font-size: 30px;color: #9d9d9d;margin-bottom: 20%;height: 100px;overflow: hidden}
    }
    .cate_pic{height: 260px;margin-bottom: 10px}
    .cateBrief{font-size: 16px;height: 74px;overflow: hidden}
  }

  #featureProducts{
    .title{font-size: 28px}
  }
  #aboutUs{padding: 65px 2% 0 2%;box-sizing: border-box;
    .wrapper{display: flex;justify-content: space-between}
    .leftBox{flex: 0 0 42%}
    .rightBox{flex: 0 0 54%}
    #imgBox{padding: 0 10px;position: relative;
      .block{position: absolute;
        width: 84px;
        height: 84px;
        background: $main_green;
        content: "";}
      .top .block{top: -10px;}
      .bottom .block{bottom: -10px;}
      .left{left: 0}
      .right{right: 0}
      #imgZoom{position: relative;z-index: 2}
    }

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

  #indexNews{    padding: 75px 0;
    .wrapper{display: flex;justify-content: space-between}
    .list{;box-sizing: border-box;flex:0 0 30%;height: 420px;overflow: hidden}
    a{display: block;box-shadow: 0 0 10px #e9e9e9;}
    .newIcon span{background:$main_green;font-size: 14px;color: #fff;padding: 5px 10px;display: inline-block;margin-bottom: 5px;}
    .txt{box-sizing: border-box; padding: 25px 6.5% 0}
    .newPic .pic{height: 300px}
    .newTitle{height: 48px;font-family: "Open Sans Bold";overflow: hidden;
      font-size: 20px;
      color: #262a31;}
    .newDate{padding-top: 7px;font-size: 14px;color: #555;margin-bottom: 20px}
  }
</style>
