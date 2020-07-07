<template>
  <div v-if="indexProducts" id="featureProducts">
    <h3 class="text_center title">FEATURED PRODUCTS</h3>
    <el-row id="featureContainer"  :gutter="20">
      <el-col v-for="(product,key) in indexProducts" :key="key" :span="6">
        <div class="border-round itemBox">
          <nuxt-link :to="{name:'products-id-slug',params:{id:product.id,slug:product.slug}}">
            <div class="flexPic">
              <img :src="product.main_image" alt="">
            </div>
            <h3 v-text="product.title"></h3>
          </nuxt-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { products } from '@/plugins/http'

export default {
  name: 'Products',
  components: {},
  data() {
    return {
      indexProducts: []
    }
  },
  computed: {},
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      // feature products
      const res = await products({
        filter: { is_index: 1 },
        take: 8
      })
      this.indexProducts = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
  #featureProducts{
    .title{font-size: 32px;margin-bottom: 20px}
    .itemBox{padding: 1rem;;height: 330px;overflow: hidden;margin-bottom: 20px}
    .flexPic{height: 300px}
  }
</style>
