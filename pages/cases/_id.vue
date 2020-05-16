<template>
  <div class="wrapper">
    <Bread :breads="breadList"></Bread>
    <h1 id="sampleTitle" v-text="sample.title"></h1>
    <p id="ex_msg">
      created at:<span v-text="sample.create_date"></span>
    </p>
    <div id="desc" class="description" v-html="sample.desc"></div>
  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import { sample } from '~/plugins/http'
import { APP_URL } from '~/seo.config'

export default {
  name: 'Show',
  components: { Bread },
  data() {
    return {
      sample: '',
      id: null,
      breadList: [
        { title: 'Cases', url: '/cases' }
      ]
    }
  },
  computed: {},
  created() {
    const params = this.$route.params
    this.id = params.id
    this.getSamples(this.id)
  },

  methods: {
    async getSamples(id) {
      sample(id).then((response) => {
        this.sample = response.data
      })
    }
  },
  head() {
    const sample = this.sample
    return {
      title: sample.seo_title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: sample.seo_keywords },
        { hid: 'description', name: 'description', content: sample.seo_desc }
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
              'name': 'Cases',
              'item': APP_URL + '/cases'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'CaseDetail',
              'item': APP_URL + '/cases/' + this.id
            }
          ]
        }
      },
      {
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': sample.seo_title,
          'image': [
            sample ? sample.mid_img : ''
          ],
          'datePublished': sample.created_at,
          'dateModified': sample.updated_at
        }
      }
      ]

    }
  }
}
</script>

<style scoped lang="scss">
  #sampleTitle{font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
    color: #222;}
  #ex_msg{margin: 0 0 10px;text-align: center}
  #desc{min-height: 200px;padding: 20px 0;color: #555;
    line-height: 180%;
    font-size: 16px;
  }
</style>
