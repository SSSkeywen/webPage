<template>
  <div class="home_box">
      <div>
      </div>
      <!-- <router-link :to="address">message</router-link> -->
      <div class="tb_button">
          <button @click="tbmessage"></button>
      </div>
  </div>
</template>

<script>
export default {
  data (){
      return{
          address: '/tbmessage'
      }
  },
  methods: {
      tbmessage(){
          this.$router.push({ path: '/tbmessage'})
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

.home_box{
    width: 10rem;
    height: 100%;
    background-color: $bgcolor;
}
</style>


