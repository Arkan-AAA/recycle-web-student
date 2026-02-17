<template>
  <div :class="$style.rectangleParent">
    <div :class="$style.frameChild" />
    <div :class="$style.frameItem" />
    <div :class="$style.frameInner" />
    <div :class="$style.rectangleDiv" />
    <div :class="$style.frameChild2" />
    <div :class="$style.frameChild3" />
    <div :class="$style.frameChild4" />
    <div :class="$style.div">Напишите вопрос</div>
    <div :class="$style.ellipseDiv" />
    <div :class="$style.frameChild5" />
    <b :class="$style.b">ИИ - помощник</b>
    <div :class="$style.div2">Новый чат</div>
    <div :class="$style.div3">Поиск в чатах</div>
    <div :class="$style.div4">Ваши чаты</div>
    <div :class="$style.div5">Топ Вопросы</div>
    <b :class="$style.b2">Главная</b>
    <img :class="$style.image1Icon" alt="" />
    <img :class="$style.image2Icon" alt="" />
    <img :class="$style.image3Icon" alt="" />
    <img :class="$style.image4Icon" alt="" />
    <img :class="$style.image5Icon" alt="" />
    <div :class="$style.div6">Добро пожаловать в ИИ-помощник</div>
    <img :class="$style.image6Icon" alt="" />
  </div>
</template>
<style  module>.rectangleParent {
  width: 100%;
  height: 900px;
  position: relative;
  background-color: #212122;
  overflow: hidden;
  text-align: left;
  font-size: 22px;
  color: #000;
  font-family: Inter;
}
.frameChild {
  position: absolute;
  top: 18px;
  left: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  width: 342px;
  height: 900px;
  flex-shrink: 0;
}
.frameItem {
  position: absolute;
  top: 379px;
  left: 35px;
  border-radius: 20px;
  background-color: #e0d8d8;
  width: 272px;
  height: 429px;
  flex-shrink: 0;
}
.frameInner {
  position: absolute;
  top: 269px;
  left: 35px;
  border-radius: 20px;
  background-color: #e0d8d8;
  width: 272px;
  height: 46px;
  flex-shrink: 0;
}
.rectangleDiv {
  position: absolute;
  top: 123px;
  left: 35px;
  border-radius: 20px;
  background-color: #e0d8d8;
  width: 272px;
  height: 46px;
  flex-shrink: 0;
}
.frameChild2 {
  position: absolute;
  top: 196px;
  left: 35px;
  border-radius: 20px;
  background-color: #e0d8d8;
  width: 272px;
  height: 46px;
  flex-shrink: 0;
}
.frameChild3 {
  position: absolute;
  top: 808px;
  left: 506px;
  box-shadow: 0px 8px 4.9px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  background-color: #fff;
  width: 736px;
  height: 58px;
  flex-shrink: 0;
}
.frameChild4 {
  position: absolute;
  top: -11px;
  left: 342px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #000;
  width: 2px;
  height: 930px;
  flex-shrink: 0;
}
.div {
  position: absolute;
  top: 825px;
  left: 524px;
  font-size: 20px;
  color: #0a0a0a;
  flex-shrink: 0;
}
.ellipseDiv {
  position: absolute;
  top: 817px;
  left: 1181px;
  border-radius: 50%;
  background-color: #252525;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.frameChild5 {
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.25);
  background-color: #212122;
  width: 1440px;
  height: 68px;
  flex-shrink: 0;
}
.b {
  position: absolute;
  top: 19px;
  left: 365px;
  font-size: 24px;
  color: #fff;
  flex-shrink: 0;
}
.div2 {
  position: absolute;
  top: 132px;
  left: 111px;
  flex-shrink: 0;
}
.div3 {
  position: absolute;
  top: 205px;
  left: 111px;
  flex-shrink: 0;
}
.div4 {
  position: absolute;
  top: 389px;
  left: 112px;
  flex-shrink: 0;
}
.div5 {
  position: absolute;
  top: 278px;
  left: 111px;
  flex-shrink: 0;
}
.b2 {
  position: absolute;
  top: 18px;
  left: 55px;
  font-size: 26px;
  color: #fff;
  flex-shrink: 0;
}
.image1Icon {
  position: absolute;
  top: 132px;
  left: 57px;
  width: 31px;
  height: 31px;
  object-fit: cover;
  flex-shrink: 0;
}
.image2Icon {
  position: absolute;
  top: 201px;
  left: 55px;
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}
.image3Icon {
  position: absolute;
  top: 274px;
  left: 55px;
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}
.image4Icon {
  position: absolute;
  top: 389px;
  left: 57px;
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}
.image5Icon {
  position: absolute;
  top: 819px;
  left: 1183px;
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
}
.div6 {
  position: absolute;
  top: 384px;
  left: 618px;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  display: inline-block;
  width: 511px;
  height: 46px;
  flex-shrink: 0;
}
.image6Icon {
  position: absolute;
  top: 12px;
  left: 572px;
  width: 44px;
  height: 44px;
  object-fit: cover;
  flex-shrink: 0;
}

</style>