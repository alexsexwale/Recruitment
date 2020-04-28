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
/* success/error icon */
.md-field .success.md-icon, .md-field .error.md-icon {
  position: inherit;
}
.pad {
  padding-left: 10px;
}
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
  z-index: 99;
}
.lds-circle > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #dddddd;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
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
