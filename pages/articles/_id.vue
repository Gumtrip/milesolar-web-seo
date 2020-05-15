<template>
  <div class="wrapper">
    <Bread :breads="breadList"></Bread>
    <h1 id="articleTitle" v-text="article.title"></h1>
    <p id="ex_msg">
      created at:<span v-text="article.create_date"></span>
    </p>
    <div id="desc" class="description" v-html="article.desc">
    </div>
  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import { article } from '~/plugins/http'
import { APP_URL } from '~/seo.config'

export default {
  name: 'Show',
  components: { Bread },
  data() {
    return {
      article: '',
      id: null,
      breadList: [
        { title: 'News', url: '/articles' }
      ]
    }
  },
  computed: {},
  created() {
    const params = this.$route.params
    this.id = params.id
    this.getArticle(this.id)
  },

  methods: {
    async getArticle(id) {
      article(id).then((response) => {
        this.article = response.data
      })
    }
  },
  head() {
    const article = this.article
    return {
      title: article.seo_title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: article.seo_keywords },
        { hid: 'description', name: 'description', content: article.seo_desc }
      ],
      script: [{
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Index',
              'item': APP_URL
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Articles',
              'item': APP_URL + '/articles'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'ArticleDetail',
              'item': APP_URL + '/articles/' + this.id
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
  #articleTitle{font-size: 20px;
    text-align: center;
    padding-bottom: 20px;
    color: #222;}
  #ex_msg{margin: 0 0 10px;text-align: center;font-size: 14px}
  #desc{min-height: 200px;padding: 20px 0;color: #555;
    line-height: 180%;
    font-size: 16px;
  }
</style>
