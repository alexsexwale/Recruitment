<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown">
        <i class="fa fa-2x" @click="toggleDropDown"><md-icon class="fa md-size-2x" style="color:#fff">leaderboard</md-icon></i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">Reports</li>
        <li class="adjustments-line text-center">
          <slot name="reports"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "report-menu",
  props: {
    sidebarMini: Boolean,
    sidebarImg: Boolean
  },
  data() {
    return {
      isOpen: false,
      backgroundImage: "/img/sidebar-2.jpg",
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    updateValue(name, val) {
      this.$emit(`update:${name}`, val);
    },
    updateValueImg(name, val) {
      this.$emit(`update:${name}`, val);

      if (this.sidebarImg) {
        document.body.classList.toggle("sidebar-image");
        this.$emit("update:image", "");
      } else {
        document.body.classList.toggle("sidebar-image");
        this.$emit("update:image", this.backgroundImage);
      }
    },
  }
};
</script>
<style>
.centered-row {
  display: flex;
  height: 100%;
  align-items: center;
}

.button-container .btn {
  margin-right: 10px;
}

.centered-buttons {
  display: flex;
  justify-content: center;
}

</style>
