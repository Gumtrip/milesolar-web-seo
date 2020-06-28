<template>
  <ul id="indexNews">
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
  </ul>
</template>

<script>
import { articles } from '@/plugins/http'
export default {
  name: 'IndexNews',
  components: {},
  async asyncData() {
    // 首页文章
    const res1 = await articles({
      filter: { is_index: 1 },
      take: 3
    })

    return {
      articles: res1.data
    }
  },

  data() {
    return {}
  },
  computed: {},
  created() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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
