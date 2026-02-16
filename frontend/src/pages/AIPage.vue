<template>
  <div :class="$style.rectangleParent">
    <div :class="$style.frameChild" />
    <div :class="$style.frameItem" />
    <div :class="$style.div">Напишите вопрос</div>
    <div :class="$style.frameInner" />
    <div :class="$style.rectangleDiv" />
    <b :class="$style.b">ИИ - помощник</b>
    <b :class="$style.b2">Новый чат</b>
    <b :class="$style.b3">Поиск в чатах</b>
    <b :class="$style.b4">Ваши чаты</b>
    <b :class="$style.b5">Топ Вопросы</b>
    <b :class="$style.b6">Документация Колледжа</b>
    <b :class="$style.b7">Главная</b>
  </div>
</template>
<style  module>.rectangleParent {
  width: 100%;
  height: 900px;
  position: relative;
  background-color: #c9c9c9;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #fff;
  font-family: Inter;
}
.frameChild {
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #4f4f4f;
  width: 342px;
  height: 900px;
}
.frameItem {
  position: absolute;
  top: 808px;
  left: 506px;
  box-shadow: 0px 8px 4.9px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  background-color: #fff;
  width: 736px;
  height: 58px;
}
.div {
  position: absolute;
  top: 825px;
  left: 524px;
  color: #0a0a0a;
}
.frameInner {
  position: absolute;
  top: 817px;
  left: 1181px;
  border-radius: 50%;
  background-color: #252525;
  width: 40px;
  height: 40px;
}
.rectangleDiv {
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.25);
  background-color: #252525;
  width: 1440px;
  height: 68px;
}
.b {
  position: absolute;
  top: 19px;
  left: 362px;
  font-size: 24px;
}
.b2 {
  position: absolute;
  top: 134px;
  left: 49px;
}
.b3 {
  position: absolute;
  top: 177px;
  left: 49px;
}
.b4 {
  position: absolute;
  top: 306px;
  left: 49px;
  font-size: 16px;
  color: #a09999;
}
.b5 {
  position: absolute;
  top: 220px;
  left: 47px;
}
.b6 {
  position: absolute;
  top: 263px;
  left: 49px;
}
.b7 {
  position: absolute;
  top: 19px;
  left: 47px;
  font-size: 24px;
  color: #d3392c;
}

</style>