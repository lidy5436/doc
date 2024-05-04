<template>
  <DropdownTransition>
    <ul class="page-sidebar-toc-ul-wrapper" v-if="items && items[0].children && items[0].children.length">
      <li class="page-sidebar-toc-li-wrapper" v-for="(item,index) in items[0].children" :key="index">
        <PageSidebarLink :sidebarDepth="sidebarDepth" :item="item"/>
      </li>
    </ul>
  </DropdownTransition>
</template>

<script>
import DropdownTransition from "./DropdownTransition.vue";
import PageSidebarLink from "./PageSidebarLink.vue";

export default {
  components: {PageSidebarLink, DropdownTransition},
  props: ["items", "depth", "sidebarDepth"],
  data() {
    return {
      openGroupIndex: 0
    };
  },
}
</script>

<style scoped lang="stylus">
.page-sidebar-toc-ul-wrapper
  padding-left 0
  list-style none
.page-sidebar-toc-li-wrapper
  line-height 17px
  text-align left
  overflow auto
  text-overflow ellipsis
  font-size 16px
  list-style none

</style>
