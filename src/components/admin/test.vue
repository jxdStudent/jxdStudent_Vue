<template>
  <div class="oDiv">
    <div style="margin-top: 20px">
      <el-button @click="delArray()" type="danger">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      style="width: 100%"
      max-height="250"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-upload
      class="avatar-uploader"
      action="http://localhost:8081/uploadImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      enctype="multipart/form-data"
      :before-upload="beforeAvatarUpload"
    name="photo">
      <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-image :src="imgs" style="width: 240px;float: left;"></el-image>



  </div>
</template>

<script>
  import axios from "axios";
  export default {
        name: "test",
      data () {
        return {
          tableDataAmount: [],
          imageUrl: '',
          tableData: [{
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }],
          imgs:'',
        }
      },
      methods: {
        deleteRow (index, rows) {
          rows.splice(index, 1)
        },
        // 选择事件 得到选中的数据
        handleSelectionChange (data) {
          this.tableDataAmount = data
        },
        // 批量清除
        delArray () {
          var that = this
          // 拿到选中的数据；
          var val = this.tableDataAmount
          // 如果选中数据存在
          if (val) {
            // 将选中数据遍历
            val.forEach(function (item, index) {
              // 遍历源数据
              that.tableData.forEach(function (itemI, indexI) {
                // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
                if (item.name === itemI.name) {
                  that.tableData.splice(indexI, 1)
                }
              })
            })
          }
          // 清除选中状态
          this.$refs.multipleTable.clearSelection()
        },
        handleAvatarSuccess(res, file) {
          //this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrl = URL.createObjectURL(file.raw);
          axios.post("updateImgForStu/" + "10017").then(res => {
            if (res.data != "fail") {
              this.imgs = "http://localhost:8081/" + res.data;
              alert(this.imgs)
              this.$message({
                type: 'success',
                message: '上传成功'
              })
            } else {
              this.$message.error("上传失败！")
            }
          })
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
      }
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
