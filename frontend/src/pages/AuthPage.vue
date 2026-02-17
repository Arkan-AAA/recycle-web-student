<template>
  <div>
    <div :class="$style.frameChild" />
    <b :class="$style.login">Login</b>
    <div :class="$style.eMail">E-Mail:</div>
    <div :class="$style.div">Для входа в систему используйте только свою учетную запись.</div>
    <div :class="$style.div2">Пароль:</div>
    <div :class="$style.div3">Забыли пароль ?</div>
    <div :class="$style.div4">Запомнить меня</div>
    <div :class="$style.frameItem" />
    <div :class="$style.frameInner" />
    <div :class="$style.rectangleDiv" />
    <div :class="$style.div5">Войти в систему</div>
    <div :class="$style.frameChild2" />
    <div :class="$style.frameChild3" />
    <div :class="$style.frameChild4" />
    <div :class="$style.welcomeTo">Welcome to</div>
    <div :class="$style.logInTo">Log in to access your account</div>
    <div :class="$style.narxozJournal">NARXOZ JOURNAL</div>
  </div>
</template>
<style  module>.rectangleParent {
  width: 100%;
  height: 900px;
  position: relative;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #000;
  font-family: Inter;
}
.frameChild {
  position: absolute;
  top: 258px;
  left: 566px;
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: #fff;
  width: 780px;
  height: 458px;
  flex-shrink: 0;
}
.login {
  position: absolute;
  top: 214px;
  left: 895px;
  font-size: 36px;
  flex-shrink: 0;
}
.eMail {
  position: absolute;
  top: 350px;
  left: 601px;
  flex-shrink: 0;
}
.div {
  position: absolute;
  top: 297px;
  left: 601px;
  flex-shrink: 0;
}
.div2 {
  position: absolute;
  top: 450px;
  left: 601px;
  flex-shrink: 0;
}
.div3 {
  position: absolute;
  top: 567px;
  left: 1120px;
  color: #0e2284;
  flex-shrink: 0;
}
.div4 {
  position: absolute;
  top: 566px;
  left: 641px;
  flex-shrink: 0;
}
.frameItem {
  position: absolute;
  top: 485px;
  left: 601px;
  border-radius: 10px;
  background-color: rgba(242, 198, 198, 0.55);
  width: 685px;
  height: 46px;
  flex-shrink: 0;
}
.frameInner {
  position: absolute;
  top: 389px;
  left: 601px;
  border-radius: 10px;
  background-color: rgba(242, 198, 198, 0.55);
  width: 685px;
  height: 46px;
  flex-shrink: 0;
}
.rectangleDiv {
  position: absolute;
  top: 627px;
  left: 1042px;
  border-radius: 10px;
  background-color: #d3392c;
  width: 244px;
  height: 48px;
  flex-shrink: 0;
}
.div5 {
  position: absolute;
  top: 639px;
  left: 1082px;
  color: #fff;
  flex-shrink: 0;
}
.frameChild2 {
  position: absolute;
  top: 566px;
  left: 601px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(190, 189, 189, 0.55);
  width: 25px;
  height: 25px;
  flex-shrink: 0;
}
.frameChild3 {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #252525;
  width: 1440px;
  height: 69px;
  flex-shrink: 0;
}
.frameChild4 {
  position: absolute;
  top: 69px;
  left: -226px;
  border-radius: 200px;
  background-color: #d90135;
  width: 743px;
  height: 831px;
  flex-shrink: 0;
}
.welcomeTo {
  position: absolute;
  top: 339px;
  left: 146px;
  font-size: 36px;
  color: #fff;
  display: inline-block;
  width: 208px;
  height: 87px;
  flex-shrink: 0;
}
.logInTo {
  position: absolute;
  top: 455px;
  left: 84px;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  display: inline-block;
  width: 359px;
  height: 87px;
  flex-shrink: 0;
}
.narxozJournal {
  position: absolute;
  top: 391px;
  left: 70px;
  font-size: 40px;
  font-weight: 800;
  color: #fff;
  display: inline-block;
  width: 409px;
  height: 87px;
  flex-shrink: 0;
}

</style>