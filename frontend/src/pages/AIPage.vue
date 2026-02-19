<script setup>
import { computed } from 'vue';
import authService from '../services/auth.service';

const userName = computed(() => {
  const user = authService.getUser();
  return user?.name || user?.username || 'Гость';
});
</script>

<template>
  <div :class="$style.image6Parent">
    <img :class="$style.image6Icon" alt="" />
    <div :class="$style.frameChild" />
    <div :class="$style.div">Напишите вопрос</div>
    <div :class="$style.frameItem" />
    <b :class="$style.b">Главная</b>
    <img :class="$style.image5Icon" alt="" />
    <div :class="$style.howCanI">How can i help you<br/>today?</div>
    <div :class="$style.helloAlikhan">Hello {{ userName }} !</div>
  </div>
</template>
<style  module>.image6Parent {
  width: 100%;
  height: 900px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #000;
}
.image6Icon {
  position: absolute;
  top: -152px;
  left: 0px;
  border-radius: 60px;
  width: 1466px;
  height: 1203px;
  object-fit: cover;
  flex-shrink: 0;
}
.frameChild {
  position: absolute;
  top: 813px;
  left: 365px;
  box-shadow: 0px 8px 4.9px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  background-color: #fff;
  width: 736px;
  height: 58px;
  flex-shrink: 0;
}
.div {
  position: absolute;
  top: 830px;
  left: 383px;
  color: #0a0a0a;
  flex-shrink: 0;
}
.frameItem {
  position: absolute;
  top: 822px;
  left: 1040px;
  border-radius: 50%;
  background-color: #252525;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.b {
  position: absolute;
  top: 18px;
  left: 55px;
  font-size: 26px;
  color: #fff;
  flex-shrink: 0;
}
.image5Icon {
  position: absolute;
  top: 824px;
  left: 1042px;
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}
.howCanI {
  position: absolute;
  top: 380px;
  left: 492px;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
  width: 481px;
  height: 44px;
  flex-shrink: 0;
}
.helloAlikhan {
  position: absolute;
  top: 358px;
  left: 492px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
  width: 481px;
  height: 44px;
  flex-shrink: 0;
}

</style>