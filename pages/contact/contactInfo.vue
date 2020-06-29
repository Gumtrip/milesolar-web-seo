<template>
    <div>
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
    </div>
</template>

<script>
    export default {
        name: "contactInfo",
        components: {},
        data() {
            return {
              contactList: [
                { label: 'Email', icon: 'fa-envelope', value: 'info@milesolar.com', url: 'mailto:info@milesolar.com' },
                { label: 'Phone', icon: 'fa-mobile', value: '008613889943867', url: 'tel:008613889943867' },
                { label: 'Skype', icon: 'fa-skype', value: '13812341234@qq.com' },
                { label: 'Location', icon: 'fa-map-marker', value: '4th Floor,No.21 Jiebian Industrial Zone Foshan Guangdong China' }
              ],
            }
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
  #listBox{
    p,a{position: relative;display: block;padding-left: 40px}
    .icon{position: absolute;left: 0;top: 4px}
  }
</style>
