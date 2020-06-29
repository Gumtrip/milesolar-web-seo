<template>
  <div id="MsgBox" class="wrapper">
    <Bread :breads="breadList"></Bread>
    <div id="contactInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="contactInfoTitle">Contact Info</span>
        </div>
        <contactInfo></contactInfo>
      </el-card>
    </div>
    <el-card id="inquiryBox">
      <div slot="header">
        <h2 class="text_center boxTitle">Message</h2>

      </div>
      <h3 class="text_center boxSubTitle">If You Have Any Suggestions or Question For Us.Please Contact Us.</h3>
      <div id="productBox" :class="{half:Object.keys(product).length > 0 }">
        <section v-if="Object.keys(product).length > 0" id="productInfo">
          <div id="product">
            <div class="desc">
              <h3 class="title" v-text="product.title"></h3>
              <p v-text="product.brief"></p>
            </div>
            <div class="flexPic">
              <img :src="product.main_image" :alt="product.title">
            </div>
          </div>
        </section>
        <contactForm :simple="false" :product="product"></contactForm>
      </div>
    </el-card>

  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
import { product } from '~/plugins/http'
import { APP_URL } from '~/seo.config'
import contactForm from './contactForm'
import contactInfo from './contactInfo'
export default {
  name: 'Index',
  components: { Bread, contactForm, contactInfo },

  data() {
    return {

      product_id:0,
      product: {},
      breadList: [
        { title: 'Products', url: '/products' }
      ],
    }
  },
  computed: {},
  watch: {
    $route() {
      location.reload()
    }
  },
  created() {
    const query = this.$route.query
    if(query.product_id){
      this.product_id = query.product_id
      this.getProduct(this.product_id)
    }
  },
  methods: {
    getProduct(id) {
      product(id).then((response) => {
        this.product = response.data
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
              'position': 1,
              'name': 'Index',
              'item': APP_URL
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Contact Us',
              'item': APP_URL + '/contact'
            }
          ]
        }
      }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/_variables";
  #MsgBox{padding-bottom: 30px}
  #inquiryBox{padding-bottom: 30px;
    .boxTitle{margin-bottom: 10px;font-size: 28px}
    .boxSubTitle{margin-bottom: 40px;font-size: 24px;color: #666;}
  }
  #productBox{display: flex;justify-content: space-between;
    #contact_form ::v-deep{flex:0 0 90%;margin: 0 auto;
      .required .el-form-item__label:after{content: '*';color: $red}
    }
    &.half{
      #productInfo{flex: 0 0 40%}
      #contact_form{flex: 0 0 50%}
    }

    .title{margin-bottom: 20px;font-size: 20px}
    .desc{margin-bottom: 20px;font-size: 16px;color: #666;}
    .flexPic{;border: 1px solid $light_grey;border-radius: 5px;box-sizing: border-box;overflow: hidden}
  }
  #contactInfo ::v-deep{margin-bottom: 50px;
    .contactInfoTitle{font-size: 28px}
    .fa{display: inline-block;width: 50px;text-align: center;font-size: 30px}
    p,a{padding-left: 50px}
    #listBox{display: flex;flex-wrap: wrap;
      .list{flex: 0 0 50%;margin-bottom: 20px;
        .label{font-size: 28px}
        .info{font-size: 28px}
      }

    }
  }
</style>
