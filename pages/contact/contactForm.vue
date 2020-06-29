<template>
  <el-form id="contact_form" ref="postForm" :model="postForm" :rules="rules" label-width="100px">
    <el-form-item placeholder="Please Input Your Name" class="required" label="Name:" prop="name">
      <el-input v-model="postForm.name" class="required" :attr="{required:true}">
      </el-input>
    </el-form-item>
    <el-form-item v-if="!simple" label="Mobile:" placeholder="Please Input Your Mobile">
      <el-input v-model="postForm.phone" type="tel"></el-input>
    </el-form-item>
    <el-form-item label="Email:" placeholder="Please Input Your Email" class="required" prop="email">
      <el-input v-model="postForm.email" class="required" :attr="{required:true}" type="email"></el-input>
    </el-form-item>
    <el-form-item v-if="!simple" label="Skype:" placeholder="Please Input Your Skype">
      <el-input v-model="postForm.skype">
      </el-input>
    </el-form-item>
    <el-form-item label="Message:" placeholder="Please Input Your Message" class="required" prop="msg">
      <el-input v-model="postForm.msg" class="required" :attr="{required:true}" type="textarea">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="submitBtn" size="medium" type="primary" @click="submitForm">Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { MessageBox ,Message } from 'element-ui'
  import { echoErrorMsg  } from '@/plugins/utils'
  import {  storeMsg } from '~/plugins/http'

  export default {
  name: 'ContactForm',
  components: {},
  props:{
    simple:{
      type:Boolean,
      default:(()=>{
        return true
      })
    },
    product:{
      type:Object,
      default: (()=>{
        return null
      })
    }
  },
  data() {
    return {
      postForm: {
        name: '',
        phone: '',
        email: '',
        skype: '',
        msg: ''
      },
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
  created() {
    if (this.product && Object.keys(this.product).length > 0) {
      this.postForm.product_id = this.product.id
      this.postForm.product_info = this.product
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
            const Msg = echoErrorMsg(e)
            Message.error(`Error: ${Msg}`)
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/_variables";
  #contact_form ::v-deep{
    .required .el-form-item__label:after{content: '*';color: $red}
  }
</style>
