<template>
  <section class="pagination">
  	<a 
      class="prev" 
      :class="{'hover' : prevHover}"
      href="javascript:;" 
      v-on:click="prevPage"
      v-on:mouseover="prevHoverToggle"
      v-on:mouseout="prevHoverToggle"><img src="../../assets/images/prev.png"></a>
  	<a class="radius" v-for="page in pages"
  		:class="{'active': page === curPage, 'hover': page === hoverPage && curPage !== hoverPage}"
  		:key="page"
  		href="javascript:;"
      v-on:click="jumpPage(page)"
      v-on:mouseover="HoverToggle(page)"
      v-on:mouseout="HoverToggle(-1)">{{page}}</a>
  	<a 
      class="next"
      :class="{'hover' : nextHover}"
      href="javascript:;" 
      v-on:click="nextPage"
      v-on:mouseover="nextHoverToggle"
      v-on:mouseout="nextHoverToggle"><img src="../../assets/images/next.png"></a>
  </section>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      curPage: this.currentPage,
      totPage: this.totlePage,
      prevHover: false,
      nextHover: false,
      hoverPage: -1
    }
  },
  props: {
    totlePage: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages () {
      let left = 1
      let right = this.totPage
      let ar = []
      if (this.totPage >= 11) {
        if (this.curPage >= 5 && this.curPage < this.totPage - 3) {
          left = this.curPage - 2
          right = this.curPage + 2
          while (left <= right) {
            ar.push(left)
            left++
          }
          ar.unshift('...')
          ar.unshift(1)
          ar.push('...')
          ar.push(this.totPage)
        } else {
          if (this.curPage < 5) {
            left = 1
            right = 6
            while (left <= right) {
              ar.push(left)
              left++
            }
            ar.push('...')
            ar.push(this.totPage)
          } else {
            right = this.totPage
            left = this.totPage - 5
            while (left <= right) {
              ar.push(left)
              left++
            }
            ar.unshift('...')
            ar.unshift(1)
          }
        }
      } else {
        while (left <= right) {
          ar.push(left)
          left++
        }
      }
      return ar
    }
  },
  methods: {
    prevPage () {
      let goPageIndex = this.curPage - 1
      if (goPageIndex < 1) {
        goPageIndex = 1
        return
      }
      this.jumpPage(goPageIndex)
    },
    nextPage () {
      let goPageIndex = this.curPage + 1
      if (goPageIndex > this.totPage) {
        goPageIndex = this.totPage
        return
      }
      this.jumpPage(goPageIndex)
    },
    jumpPage (p) {
      // 如果点击的按钮不是正常的页码（...），或者点击的是当前页码，则点击的时候没有任何效果
      if (typeof p !== 'number' || p === this.curPage) return

      this.$set(this.$data, 'curPage', p)

      this.$emit('jumpPage', this.curPage)
    },
    prevHoverToggle () {
      // 如果当前页是第一页，则上一页的按钮为不可点击
      if (this.curPage === 1) {
        this.$set(this.$data, 'prevHover', false)
        return
      }
      this.prevHover = !this.prevHover
    },
    nextHoverToggle () {
      // 如果当前页是最后一页，则下一页的按钮为不可点击
      if (this.curPage === this.totPage) {
        this.$set(this.$data, 'nextHover', false)
        return
      }
      this.nextHover = !this.nextHover
    },
    HoverToggle (p) {
      // 如果hover的按钮不是正常的页码（...），或者hover的是当前页码，则hover的时候没有任何效果
      if (typeof p !== 'number') return

      this.$set(this.$data, 'hoverPage', p)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pagination {
  	height: 22px;
  	a {
  		display: inline-block;
  		height: 22px;
  		line-height: 22px;
  		text-align: center;
  		width: 22px;
      border-radius: 50%;
      border: 1px solid #ddd;
  		font-size: 12px;
  		color: #999;
  		background-color: #fff;
  		margin-right: 10px;
  		&.prev, &.next {
  			width: 22px;
  			background-color: #f2f2f2;
  		}
  		&.next {
  			margin-right: 0;
  		}
  		&.active {
  			background-color: #89b2f2;
  			color: #FFF;
  		}
  		// &:not([class="active"]):hover {
  		// 	background-color: #ECECEC;
  		// 	color: #5AC5BF;
  		// }
      &.hover {
        background-color: #ECECEC;
        color: #89b2f2;
      }
  	}
  }
</style>
