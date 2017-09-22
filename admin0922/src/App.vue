<template>
  <div id="app">
    <top-nav v-if="notLoginPage"></top-nav>
    <left-nav v-if="notLoginPage"></left-nav>
    <router-view :class="{'page-container': notLoginPage}"></router-view>
  </div>
</template>

<script>
import TopNav from './components/commons/TopNav'
import LeftNav from './components/commons/LeftNav'
export default {
  name: 'app',
  data () {
    return {
      notLoginPage: false
    }
  },
  components: {
    TopNav,
    LeftNav
  },
  mounted () {
    this.notLoginPage = this.$route.name !== 'Login'
  },
  updated () {
    this.notLoginPage = this.$route.name !== 'Login'
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
html, body {
  background-color: #f2f2f2;
}
body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -ms-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {
    display: block;
}

audio, canvas, progress, video {
    display: inline-block;
    vertical-align: baseline;
}

audio:not([controls]) {
    display: none;
    height: 0;
}

[hidden],
template {
    display: none;
}

body, button, input, optgroup, select, textarea {
    font: 12px/1.5 arial,Helvetica Neue,tahoma,"Hiragino Sans GB",Microsoft YaHei,\5b8b\4f53;
}

input, select, textarea {
    outline: none;
    font-size: 12px;
    @include box-sizing(border-box);
    padding: .5em;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

fieldset {
    border: none;
}

img, video {
    border: none;
    max-width: 100%;
    height: auto;
}

iframe {
    display: block;
}

abbr, acronym {
    border: none;
    font-variant: normal;
}

del {
    text-decoration: line-through;
}

address, caption, cite, code, dfn, em, th, var {
    font-style: normal;
    font-weight: 500;
}

ol, ul {
    list-style: none;
}

caption, th {
    text-align: left;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 100;
    font-size: 12px;
}

sub,
sup {
    font-size: 12px;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

svg:not(:root) {
    overflow: hidden;
}

hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
}

abbr[title] {
    border-bottom: 1px dotted;
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    height: auto;
}

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box;
}

button[disabled],
html input[disabled] {
    cursor: default;
}

button,
select {
    text-transform: none;
}

button {
    overflow: visible;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color: #999;
   opacity: 1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color: #999;
   opacity: 1;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
   color: #999;
}

textarea {
    overflow: auto;
    resize: none;
}

optgroup {
    font-weight: bold;
}

pre {
    overflow: auto;
}

code, kbd, pre, samp {
    font-family: monospace, monospace;
    font-size: 12px;
}

a {
    outline: none;
    text-decoration: none;
    color: #666;
}

.fl {
  float: left !important;
}
.fr {
  float: right !important;
}
clearfix:after {
  content:"\200B";
  display:block;
  height:0;
  clear:both;
}
.clearfix { *zoom:1; }/*IE/7/6*/

.tc {
  text-align: center;
}

.page-container {
  margin: 75px 0 0 240px;
  margin-right: 38px;
}
</style>
