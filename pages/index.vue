<template>
  <div class="container">
    <div>
      <section id="banner">
        <swiper ref="mySwiper">
          <swiper-slide v-for="(banner,key) in banners" :key="key">
            <router-link :to="banner.url" class="bannerImg">
              <img src="../static/banner.png" alt="Power inverter, MPPT controller, off-grid solar system, MILESOLAR">
            </router-link>
          </swiper-slide>
        </swiper>
      </section>

      <section id="indexCategories">
        <ul>
          <li v-for="(category,key) in product_categories" :key="key">
            <router-link :to="{name:'products',query:{category_id:category.id}}" class="cateBox">
              <div class="cate_pic half flexPic">
                <img :src="category.mid_img" :alt="category.title">
              </div>
              <div class="cate_title half">
                <h3 class="text_center" v-text="category.title"></h3>
                <div class="link_icon">
                  <i class="fa fa-arrow-circle-right"></i>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </section>

      <section v-if="aboutsUs" id="aboutUs">
        <div class="wrapper">
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
        </div>
      </section>
      <section id="indexNews">
        <ul class="wrapper">
          <li v-for="(article,key) in articles" :key="key" class="list">
            <router-link :to="{name:'articles-id',params:{id:article.id}}">
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
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { productCategories, articles } from '~/plugins/http'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: { Swiper, SwiperSlide
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
  created() {
    this.getCategories()
    this.getNews()
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
  }
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/_variables.scss";
  #banner {
    a{display: block;text-align: center;}
    .bannerImg{width: 100%}
    .bannerImg img{max-width: 100%}
  }
  #indexCategories{max-width: 1920px;margin:0 auto;
    ul{display: flex;}
    li{;flex: 0 0 25%;}
    .cateBox{display: flex;justify-content: space-between;box-sizing: border-box;height: 330px; padding: 10% 0;background-image: linear-gradient(to right, #e1e0e0 , #fffeff)}
    .half{flex:0 0 50%}
    .cate_title{ box-sizing: border-box;; padding:0 3%;
      h3{font-size: 30px;color: #9d9d9d;margin-bottom: 20%;height: 100px;overflow: hidden}
      .link_icon{}
      .link_icon i{color: $main_green;font-size: 44px}
    }
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
    #detailInfo{margin: 25px 0 0;height: 210px;}
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
