<template>
  <div id="MsgBox" class="wrapper">
    <Bread :breads="breadList"></Bread>
    <div id="contactInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="contactInfoTitle">Contact Info</span>
        </div>
        <ul id="listBox">
          <li v-for="(item,key) in contactList" :key="key" class="list">
            <a v-if="item.url" :href="item.url">
              <span class="icon"><i class="fa" :class="item.icon"></i></span>
              <span class="label" v-text="item.label+':'"></span>
              <span class="info" v-text="item.value"></span>
            </a>
            <p v-else>
              <span class="icon"><i class="fa" :class="item.icon"></i></span>
              <span class="label" v-text="item.label+':'"></span>
              <span class="info" v-text="item.value"></span>
            </p>
          </li>
        </ul>
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
        <el-form id="contact_form" ref="postForm" :model="postForm" :rules="rules">
          <el-form-item placeholder="Please Input Your Name" class="required" label="Name:" prop="name">
            <el-input v-model="postForm.name" class="input required" :attr="{required:true}">
            </el-input>
          </el-form-item>
          <el-form-item label="Mobile:" placeholder="Please Input Your Mobile">
            <el-input v-model="postForm.phone" class="input" type="tel"></el-input>
          </el-form-item>
          <el-form-item label="Email:" placeholder="Please Input Your Email" class="required" prop="email">
            <el-input v-model="postForm.email" class="input required" :attr="{required:true}" type="email"></el-input>
          </el-form-item>
          <el-form-item label="Skype:" placeholder="Please Input Your Skype">
            <el-input v-model="postForm.skype" class="input">
            </el-input>
          </el-form-item>
          <el-form-item label="Message:" placeholder="Please Input Your Message" class="required" prop="msg">
            <el-input v-model="postForm.msg" class="input required" :attr="{required:true}" type="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submitBtn" size="medium" type="primary" @click="submitForm">Submit
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import Bread from '@/components/utils/BreadCrumb'
import { product, storeMsg } from '~/plugins/http'
import { APP_URL } from '~/seo.config'

export default {
  name: 'Index',
  components: { Bread },
  data() {
    return {
      contactList: [
        { label: 'Email', icon: 'fa-envelope', value: 'info@milesolar.com', url: 'mailto:info@milesolar.com' },
        { label: 'Phone', icon: 'fa-mobile', value: '008613889943867', url: 'tel:008613889943867' },
        { label: 'Skype', icon: 'fa-skype', value: '13812341234@qq.com' }
      ],
      postForm: {
        product_id: null,
        product_info: null,
        name: '',
        phone: '',
        email: '',
        skype: '',
        msg: ''
      },
      product: [],
      breadList: [
        { title: 'Products', url: '/products' }
      ],
      rules: {
        name: [
          { required: true, message: 'name is required', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: 'email is required', trigger: 'change' }
        ],
        msg: [
          { required: true, message: 'msg is required', trigger: 'change' }
        ]
      }
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
    this.postForm.product_id = query.product_id
    if (this.postForm.product_id) {
      this.getProduct(this.postForm.product_id)
    }
  },
  methods: {
    async submitForm() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          try {
            const res = await storeMsg(this.postForm)
            if (res.status === 201) {
              MessageBox({
                'title': 'Message',
                'message': 'Thanks For Your Message!',
                'confirmButtonText': 'OK'
              }).then(() => {
                // 清空表单的话会触发表单验证，暂时强行刷新页面
                location.reload()
              })
            }
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
    getProduct(id) {
      product(id).then((response) => {
        this.product = response.data
        this.postForm.product_id = id
        this.postForm.product_info = response.data
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
  @import "~/assets/css/_variables";
  #MsgBox{padding-bottom: 30px}
  #inquiryBox{padding-bottom: 30px;
    .boxTitle{margin-bottom: 10px;font-size: 28px}
    .boxSubTitle{margin-bottom: 40px;font-size: 24px;color: #666;}
  }
  #productBox{display: flex;justify-content: space-between;
    #contact_form ::v-deep{flex:0 0 80%;margin: 0 auto;
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
  #contactInfo{margin-bottom: 50px;
    .contactInfoTitle{font-size: 28px}
    .fa{display: inline-block;width: 50px;text-align: center;font-size: 30px}

    #listBox{display: flex;flex-wrap: wrap;
      .list{flex: 0 0 50%;margin-bottom: 20px;
        .label{font-size: 28px}
        .info{font-size: 28px}
      }

    }
  }
</style>
