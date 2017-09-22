<template>
    <section class="user-certificate">
      <div class="main-content">
        <div class="title-oprate">
          <nav class="charge-nav">
            <a :class="{'active': toggleFlag === 0}" href="#" @click="changeNav(0)">待审核</a>
            <a :class="{'active': toggleFlag === 1}" href="#" @click="changeNav(1)">未通过</a>
            <a :class="{'active': toggleFlag === 2}" href="#" @click="changeNav(2)">已通过</a>
          </nav>
        </div>
        <div class="main-table" v-show="toggleFlag === 0">
          <div class="server-count">共<span>1000</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataTodo"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="username"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="birth"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
              <template scope="scope">
                <img :src="scope.row.img[0]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
                <img :src="scope.row.img[1]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
              </template>
            </el-table-column>
            <el-table-column
              prop="subtime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="state"
              label="上次未通过理由"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template scope="scope">
                <el-button type="text" size="small" @click="togglePass">通过</el-button>
                <el-button type="text" size="small" @click="togglePass">不通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 1">
          <div class="server-count">共<span>1000</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataNo"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="username"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="birth"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
              <template scope="scope">
                <img :src="scope.row.img[0]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
                <img :src="scope.row.img[1]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
              </template>
            </el-table-column>
            <el-table-column
              prop="subtime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="state"
              label="上次未通过理由"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template scope="scope">
                <el-button type="text" size="small" @click="togglePass">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-table" v-show="toggleFlag === 2">
          <div class="server-count">共<span>1000</span>条</div>
          <el-table
            class="table-list"
            :data="tableDataAccess"
            stripe
            style="width: 100%;border: 0;color: #666;">
            <el-table-column
              prop="username"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="birth"
              label="出生日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column prop="img" label="身份证正反面照" width="280">
              <template scope="scope">
                <img :src="scope.row.img[0]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
                <img :src="scope.row.img[1]" @click="showPicDialog(scope.row.img[0],scope.row.img[1])">
              </template>
            </el-table-column>
            <el-table-column
              prop="subtime"
              label="提交时间"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination-box">
        <pagination-comp 
          :totle-page="100" 
          :current-page="1"
          v-on:jumpPage="listenPage"></pagination-comp>
      </div>
      <!-- <el-pagination
        class="pagination-box"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="1000">
      </el-pagination> -->
      <el-dialog class="idcard-dialog" title="身份证正反面" :visible.sync="bigImg.toggle">
        <el-row>
          <el-col :span="12">
            <img :src="bigImg.up">
            <div class="pt30">身份证正面</div>
          </el-col>
          <el-col :span="12">
            <img :src="bigImg.down">
            <div class="pt30">身份证背面</div>
          </el-col>
        </el-row>
      </el-dialog>
    </section>
</template>
<script>
  import PaginationComp from './commons/PaginationComp'
  export default {
    components: {
      PaginationComp
    },
    data () {
      return {
        // picdialog: false,
        toggleFlag: 0,
        bigImg: {
          up: '',
          down: '',
          toggle: false
        },
        tableDataTodo: [{
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=c42b108db6315c60579863bdecd8a076/4034970a304e251fb11f5860ad86c9177e3e53b9.jpg', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }],
        tableDataNo: [{
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=c42b108db6315c60579863bdecd8a076/4034970a304e251fb11f5860ad86c9177e3e53b9.jpg', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }],
        tableDataAccess: [{
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=c42b108db6315c60579863bdecd8a076/4034970a304e251fb11f5860ad86c9177e3e53b9.jpg', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }, {
          username: '舒克',
          gender: '男',
          birth: '1990-12-06',
          idcard: '130130199912401240',
          subtime: '2017-09-09 13:46',
          img: ['https://www.vcg.com/creative/813179487', 'https://www.vcg.com/creative/813320834'],
          state: '未认证'
        }]
      }
    },
    methods: {
      changeNav (index) {
        this.toggleFlag = index
      },
      showPicDialog (pic1, pic2) {
        console.log(pic1, pic2)
        this.$set(this.bigImg, 'up', pic1)
        this.$set(this.bigImg, 'down', pic2)
        this.$set(this.bigImg, 'toggle', true)
        // if (this.picdialog === false) {
        //   this.picdialog = true
        // } else {
        //   // this.billdialog = !this.billdialog
        //   this.picdialog = false
        // }
      },
      hidePicDialog () {
        this.$set(this.bigImg, 'toggle', false)
      },
      togglePass (index, rows) {
        // console.log(index)
        // 可取到当前条目的信息
        // console.log(rows[index].id)
        // let state = rows[index].state
        // let tipsTextOk = state === '未认证' ? '未认证!' : '已认证！'
        // let tipsTextCancel = state === '正常' ? '已取消停用!' : '已取消启用'
        this.$confirm('确定通过吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        }).then(() => {
          this.$message({
            // type: 'success',
            // message: tipsTextOk
          })
        }).catch(() => {
          this.$message({
            // type: 'info'
            // message: tipsTextCancel
          })
        })
      },
      listenPage (p) {
        console.log(p)
      }
      // 点击页码
      // currentChange (curPage) {
      //   console.log(curPage)
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .user-certificate {color: #999;}
  .el-table {
    border: 0;
  }
  /*.th {color: #999;}*/
  /*.el-button {font-size: 14px;color: #4399ff;}*/
  .main-content {
    background-color: #FFF;
  }
  .title-oprate {
    margin: 0 20px;
    margin-left: 0;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
    font-weight: bolder;
    color: #999;
  }
  .charge-nav a {width: 140px;display: inline-block;text-align: center;padding: 10px 0;}
  .charge-nav a.active {color: #0868f3;background-color: #ececec;}
  .server-count {
    padding: 20px;
  }
  .server-count span {
    color: #0868f3;
    margin: 0 3px;
  }
  .pagination-box {
    text-align: center;
    margin-top: 30px;
  }
  td {border-bottom: 0;}
  /*.el-table td {border-bottom: none!important;}*/
  .el-table td, .el-table th.is-leaf {border-bottom: 1px solid #fff!important;}
  .el-pager li {border-radius: 50%!important;margin: 0 5px;}
  .el-message-box {background-color: #f6f6f6;}
  .el-input .el-input__inner {border: 0;}
  .cell img {width: 62px;height: 40px;}
  .idcard-dialog {
    text-align:center;
    img {
      width: 200px;
      height: 140px;
    }
  }
  .up-div img,.down-div img {width: 239px;height: 154px;}
</style>