<template>
    <main class="footer">
        <div class="copy-right">
           <span class="name">@{{`${currentYear} 李东阳的博客 &nbsp; |  &nbsp; `}} </span>
            <a :href="government.href" target="_blank" rel="noreferrer" >
              {{government.name}}
            </a>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {
            footerList: [],
            government: {},
            currentYear : ''
        }
    },

  props: ['sidebarItems'],
  mounted() {
    this.government = this.$site.themeConfig.footer.copyright
    this.currentYear =  new Date().getFullYear()
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.footer
  padding 2rem 0
  display flex
  justify-content center
  background-color #FFFFFF
  flex-wrap wrap
.footer-item
  padding 0 1rem
.footer-item a
    display inline-flex
    justify-content center
    align-items center
    color #85858a

.item-icon
  width 1.4rem
  height 1.4rem
  margin-right 0.4rem
.copy-right
    width 100vw
    display flex
    justify-content center
    margin-top 1rem
    color #85858a
.copy-right .name
    margin-right 0.4rem
</style>
