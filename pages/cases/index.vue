<template>
  <div class="wrapper">
    <Bread :breads="breadList"></Bread>
    <section id="sampleBox">
      <ul
        v-if="samples"
        v-loading="loading"
      >
        <li v-for="(sample,key) in samples" :key="key" class="sample">
          <nuxt-link :to="{name:'cases-id-slug',params:{id:sample.id,slug:sample.slug}}">
            <div class="img flexPic">
              <img :src="sample.sm_img" :alt="sample.title">
            </div>
            <div class="info">
              <h3 class="title" v-text="sample.title"></h3>
              <p class="time" v-text="sample.intro"></p>
              <p class="desc" v-text="sample.intro"></p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <div v-show="more_data" class="text_center">
      <el-button :loading="loading" type="primary" @click="getSamples">MORE PRODUCTS</el-button>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import { samples } from '~/plugins/http'
import { APP_URL } from '~/seo.config'

export default {
  name: 'Index',
  components: { Bread },
  data() {
    return {
      samples: [],
      loading: true,
      more_data: true,
      page: 1,
      postData: {},
      breadList: [
        { title: 'Cases', url: '/cases' }
      ]
    }
  },
  computed: {},
  created() {
    this.getSamples()
  },

  methods: {
    async getSamples() {
      if (this.more_data) {
        this.loading = true
        const res = await samples({
          filter: this.postData,
          page: this.page
        })
        if (res.data) {
          this.samples = this.samples.concat(res.data.data)
          if (res.data.meta.current_page >= res.data.meta.last_page) {
            this.more_data = false
          }
          this.page++
          this.loading = false
        }
      }
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
      }
      ]
    }
  }

}
</script>

<style scoped lang="scss">
  #sampleBox{padding-bottom: 30px}
  .sample{
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 15px;
    padding-bottom: 15px;
    a{display: flex;}
    .img{flex: 0 0 22%}
    .info{flex: 0 0 78%;padding-left:25px;box-sizing: border-box}
    .title{font-size: 24px;color: #555;margin-bottom: 10px}
    .time{font-size: 14px;color: #999;line-height: 20px;margin-bottom: 10px}
    .desc{font-size: 14px;
      color: #999;
      line-height: 150%;
      max-height: 63px;
      overflow: hidden;
      margin-bottom: 10px;
      margin-top: 5px;
      display: block;
    }

  }
</style>
