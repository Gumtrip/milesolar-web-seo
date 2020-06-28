<template>
  <div v-if="samples" id="indexCase">
    <h3 class="text_center title">Customer Cases</h3>
    <el-row :gutter="20">
      <el-col v-for="(sample,key) in samples" :key="key" :span="8">
        <el-card class="item">
          <nuxt-link :to="{name:'cases-id-slug',params:{id:sample.id,slug:sample.slug}}">
            <div class="flexPic">
              <img :src="sample.mid_img" alt="">
            </div>
          </nuxt-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { samples } from '@/plugins/http'
export default {
  name: 'Cases',
  components: {},
  async asyncData() {
    // 首页案例
    // const res = await samples({
    //   filter: { is_index: 1 },
    //   take: 3
    // })
    // return {
    //   samples: res.data// 首页案例
    // }
  },

  data() {
    return {
      samples: []
    }
  },
  computed: {},
  created() {
    this.getCases()
  },
  methods: {
    async getCases() {
      const res = await samples({
        filter: { is_index: 1 },
        take: 3
      })
      this.samples = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
  #indexCase{
    .title{font-size: 32px;margin-bottom: 20px}
    .item{}
    .flexPic{height: 300px;overflow: hidden}
  }
</style>
