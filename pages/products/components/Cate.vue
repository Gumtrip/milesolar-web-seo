<template>
  <div id="proCate" class="popModal trans">
    <h3 class="boxTitle">Categories</h3>
    <div id="allProducts">
      <nuxt-link :to="{name:'products'}">
        <el-button type="primary" @click="closeAll">All PRODUCTS</el-button>
      </nuxt-link>
    </div>
    <el-collapse v-if="product_categories" v-model="current">
      <el-collapse-item v-for="(cate,key) in product_categories" :key="key" :title="cate.title" :name="cate.id" class="firstCate">
        <div v-if="cate.children" :class="{show:key===current}" class="secCate">
          <h5>
            <nuxt-link :to="{name:'products',query:{category_id:cate.id}}">ALL</nuxt-link>
          </h5>
          <h5 v-for="(sec,secKey) in cate.children" :key="secKey">
            <nuxt-link :to="{name:'products',query:{category_id:sec.id}}" v-text="sec.title"></nuxt-link>
          </h5>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {productCategoryTree} from '~/plugins/http';

  export default {
  name: 'Cate',
  components: {},
  data() {
    return {
      current: null, // 当前展开的以及分类
      product_categories: []
    }
  },
  computed: {},
  watch: {

  },
  created() {
    this.getAllCategories()
  },
  methods: {
    getAllCategories() {
      productCategoryTree({
        depth: 2
      }).then((response) => {
        this.product_categories = response.data
      })
    },
    closeAll() {
      this.current = null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/css/_variables";

  #proCate /deep/{
    .boxTitle{background: $main_green;color: #fff;height: 50px;line-height: 50px;font-size: 20px;text-indent: 10px}
    #allProducts{padding: 10px 0}
      .firstCate .el-collapse-item__header{
        box-sizing: border-box;align-items: center;
        height: 60px;
        line-height: 30px;
        font-size: 16px;
        overflow: hidden;
        text-decoration: none;
        color: #333333;
      };
    .secCate{;
      a{
        display: block;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border-top: 1px solid #ddd;
        text-indent: 20px;
        color: #464545;
        &.is-active{color: $main_green}
      }
    }
    .el-collapse-item__content{padding-bottom: 0}
  }

</style>
