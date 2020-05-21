<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>
<style>
/* Pop up modal */
.modal-container {
  max-width: 400px;
  z-index: 3;
}
/* color */
.black {
  color: #000000;
}
.centre {
  text-align: center;
}
/* success/error icon */
.md-field .success.md-icon, .md-field .error.md-icon {
  position: inherit;
}
.pad {
  padding-left: 10px;
}
.background {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity .15s ease;
  transition: opacity .15s ease;
}
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
  z-index: 10000;
}
.lds-circle > div {
  display: inline-block;
  width: 128px;
  height: 128px;
  animation: lds-circle 5.4s cubic-bezier(0, 0.2, 0.8, 1) infinite; /*2.4s */
  position: absolute;
  opacity: 0.8;
}
@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
