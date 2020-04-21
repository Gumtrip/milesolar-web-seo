<template>
  <div>
    <ul v-if="list" id="breadCrumb">
      <li><router-link :to="'/'">Home <span>&nbsp; &gt;&nbsp;</span></router-link></li>
      <li v-for="(bread,key) in breads" :key="key">
        <router-link :to="bread.url" v-text="bread.title"></router-link>
        <span v-if="(key+1)<breads.length">&nbsp; &gt;&nbsp;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {},
  props: {
    breads: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      list: []
    }
  },

  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  #breadCrumb{display: flex;height: 25px;line-height: 25px;margin: 10px 0;flex-wrap: wrap;
    a{font-size: 16px;color: #888;}
  }
</style>
