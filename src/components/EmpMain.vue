<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header style=" font-size: 12px">
        <div style="float: left;">
          <span style="font-size: 20px;font-family: PingFang SC;">欢迎使用员工订餐系统</span>
        </div>
        <div align="right">
          <span>{{this.$store.state.currentUser.uname}}</span>
          <span @click="exitSys" style="cursor: pointer">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 438px">
          <el-menu>
            <navigation-item v-for="(menu,i) in adminMenus" :key="i" :item="menu"/>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style>

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
<script>
  import axios from 'axios';
  import NavigationItem from "./NavigationItem"; //引入菜单
  export default {
    name: "EmpMain",
    data() {
      //验证密码使用
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        adminMenus: [],
        userForm: {
          uname: '',
          password: '',
          newPass: '',
          checkPass: '',
        },
        pagesize: 5,
        curPage: 1,
        search: '',
        filter: 'all',
        showAddOrder: false
        ,
        showOrderTable: true,
        showUserInfo: false,
        showFoodTable: false,
        orderSelectVisible: false,
        sub: false,
        //分页菜品数据
        foodData: [],
        //全部菜品数据
        totalFoodData: [],
        //订单信息
        orderData: [],
        //全部订单信息
        totalOrderData: [],
        //部门员工列表
        empListDataByDeptno: [],
        mealData: [{
          oid: '',
          fid: '',
          fname: '',
          num: 0,
          price1: 0,
          price: 0,
          remarks: '',
        }],
        selectOrder: {
          value2: '',
          oname: '',
          dname: '',
        },
        rules: {
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          ename: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'},
          ],
          oname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          types: [
            {required: true, message: '请输入订餐类型', trigger: 'blur'},
          ],
          job: [
            {required: true, message: '请输入工作', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ],
          sal: [
            {required: true, message: '请输入工资', trigger: 'blur'},
          ],
          dname: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
          ],
          deptno: [
            {required: true, message: '请输入部门编号', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入价格', trigger: 'blur'},
          ],
          fname: [
            {required: true, message: '请输入菜品名称', trigger: 'blur'},
          ],
          uname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入菜品名称', trigger: 'blur'},
          ],
          empno: [
            {required: true, message: '请输入员工编号', trigger: 'blur'},
          ]
          , power: [
            {required: true, message: '请输入权限', trigger: 'blur'},
          ],
          uid: [
            {required: true, message: '请输入用户id', trigger: 'blur'},
          ],
        },
        order: {
          id: '',
          oname: '',
          dname: '',
          money: '',
          deptno: '',
          empno: '',
          ename: '',
          odate: '',
          types: '',
          num: '',
          state: '',
        },
        food: {
          id: '',
          fname: '',
          price: '',
        },
        dept: {
          deptno: '',
          dname: ''
        },
        user: {
          uid: '',
          uname: '',
          password: '',
          empno: '',
          power: 0,
        },

        orderForm: {
          empno: '',
          oname: '',
          types: '',
          num: '',
          money: '',
          state: '',
          deptno: '',
          odate: '',
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        yesData: [],
        selectedEmp: '',
        num1: '',
      }
    },
    methods: {
      getMenu() {
        axios.get('http://localhost:8080/getMenu/' + sessionStorage.getItem('userId')).then(res => {
          this.adminMenus = res.data;
        })
      },

      /*添加一行*/
      addLine() { //添加行数
        const newValue = {
          oid: '',
          fid: '',
          fname: '',
          num: '',
          price: '',
          remarks: '',
        };
        //添加新的行数
        this.mealData.push(newValue);
      },
      //删除行
      handleDelete(index) { //删除行数
        this.mealData.splice(index, 1)
      },
      //穿梭框改变时触发
      handleChange(value, direction, movedKeys) {
        this.selectedEmp = value + '';
        this.orderForm.oname = this.selectedEmp;
        this.orderForm.num = value.length
      }
      ,//保存提交
      save() {
        //这部分应该是保存提交你添加的内容
        //console.log(JSON.stringify(this.mealData));
        function checkAuditTime(beginTime, endTime) {
          var nowDate = new Date();
          var beginDate = new Date(nowDate);
          var endDate = new Date(nowDate);

          var beginIndex = beginTime.lastIndexOf("\:");
          var beginHour = beginTime.substring(0, beginIndex);
          var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
          beginDate.setHours(beginHour, beginMinue, 0, 0);

          var endIndex = endTime.lastIndexOf("\:");
          var endHour = endTime.substring(0, endIndex);
          var endMinue = endTime.substring(endIndex + 1, endTime.length);
          endDate.setHours(endHour, endMinue, 0, 0);
          if (nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime()) {
            return true;
          } else {
            return false;
          }
        };
        if (checkAuditTime("8:30", "10:30") && this.orderForm.types == '午餐' || checkAuditTime("13:30", "16:30") && this.orderForm.types == '晚餐') {
          if (this.num1 !== this.orderForm.num) {
            this.$message.error('餐品数量必须与订餐人数一致');
            this.sub = true;
          } else {
            this.sub = false;
            axios.post('http://localhost:8080/addOrder', this.orderForm).then(res => {
              if (res.data == "success") {
                axios.post('http://localhost:8080/addMeal', this.mealData).then(res => {
                  if (res.data == "success") {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                  }
                });
              }
            })
          }
        } else {
          alert("午餐请在10：30之前预定，晚餐请在13：30到16：30预定");
          this.sub = true;
        }

        console.log(this.orderForm)
      },
      //保存价格
      savePrice1(index, row) {
        this.totalFoodData.forEach(function (item) {
          if (item.id == row.fid) {
            row.price1 = item.price;
          }
        });
        var num = 0;
        var vm = this;
        this.mealData.forEach(function (item) {
          if (item.fid == row.fid) {
            num++;
          }
          if (num >= 2) {
            vm.$message.error('请选择不一样的菜品');
            row.fid = null
          }
        })
      },
      //改变价格
      changePrice(index, row) {
        row.price = row.num * row.price1
      },
      //获取餐品列表
      getFoodList() {
        axios.get('http://localhost:8080/getAllFoodByLike/' + 'all').then(res => {
          this.totalFoodData = res.data;
        })
      },
      //获取分页餐品列表
      getFoodListByPage() {
        if (this.search == '') {
          this.filter = 'all'
        } else {
          this.filter = document.getElementById("fnameFilter").value
        }
        axios.get('http://localhost:8080/getAllFoodByPage/' + this.curPage + '/' + this.pagesize + '/' + this.filter).then(res => {
          this.foodData = res.data
        })
      },
      //获取员工信息
      getEmpList() {
        var vm = this;
        axios.get('http://localhost:8080/getAllEmpByEmpno/' + this.$store.state.currentUser).then(res => {
          this.empListDataByDeptno = res.data;
          this.empListDataByDeptno.forEach(function (item) {
            if (item.ename === vm.$store.state.currentUser) {
              vm.orderForm.empno = item.empno;
              vm.orderForm.deptno = item.deptno;
              vm.user.empno = item.empno;
              vm.userForm.uname = vm.$store.state.currentUser;
            }
          })
        })
      },
      //获取订单信息
      getOrderList() {
        var onameFilter = this.$refs['onameFilter2'].value;
        var deptnoFilter = this.$refs['deptnoFilter2'].value;
        var dateFilter = this.$refs['dateFilter2'].value;
        if (onameFilter == '' || onameFilter == null) {
          onameFilter = 'all'
        }
        if (deptnoFilter == '' || deptnoFilter == null) {
          deptnoFilter = 'all'
        }
        if (dateFilter == '') {
          dateFilter = 'all'
        }
        if (dateFilter == null) {
          dateFilter = 'all'
        }
        axios.get('http://localhost:8080/getEmpOrderByLike/' + onameFilter + '/' + deptnoFilter + '/' + dateFilter + '/' + this.$store.state.currentUser).then(res => {
          this.totalOrderData = res.data;
        })
      },
      //获取分页订单
      getOrderListByPage() {
        var onameFilter = this.$refs['onameFilter2'].value;
        var deptnoFilter = this.$refs['deptnoFilter2'].value;
        var dateFilter = this.$refs['dateFilter2'].value;
        if (onameFilter == '' || onameFilter == null) {
          onameFilter = 'all'
        }
        if (deptnoFilter == '' || deptnoFilter == null) {
          deptnoFilter = 'all'
        }
        if (dateFilter == '') {
          dateFilter = 'all'
        }
        if (dateFilter == null) {
          dateFilter = 'all'
        }
        axios.get('http://localhost:8080/getEmpOrderByPage/' + this.curPage + '/' + this.pagesize + '/' + onameFilter + '/' + deptnoFilter + '/' + dateFilter + '/' + this.$store.state.currentUser).then(res => {
          this.orderData = res.data;
        })
      },
      saveAdd() {
      },
      //合计行
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          } else if (index === 1 || index === 2 || index === 5 || index === 6) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if (index === 4) {
              this.orderForm.money = sums[index];
              this.orderForm.state = '待确认';
              sums[index] += ' 元';
            } else if (index === 3) {
              if (sums[index] > this.orderForm.num) {
                this.$message.error('餐品数量超出，一人只能订一份餐品');
                this.sub = true
              } else {
                this.sub = false
              }
              this.num1 = sums[index];
              sums[index] += ' 份';

            }

          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;

      },
      //显示添加订餐
      showAdd() {
        this.showAddOrder = true;
        this.showFoodTable = false;
        this.showUserInfo = false;
        this.showOrderTable = false;
      },
      //显示餐品
      showFood() {
        this.showAddOrder = false;
        this.showFoodTable = true;
        this.showUserInfo = false;
        this.showOrderTable = false;
      },
      //显示订单
      showOrder() {
        this.showAddOrder = false;
        this.showFoodTable = false;
        this.showUserInfo = false;
        this.showOrderTable = true;
      },
      //显示用户信息
      showUserMsg() {
        this.showAddOrder = false;
        this.showFoodTable = false;
        this.showUserInfo = true;
        this.showOrderTable = false;
      },
      //退出
      exitSys() {
        if (confirm("确认要退出吗？")) {
          this.$store.dispatch('setUser', null);
          sessionStorage.setItem('userName', null);
          this.$router.push({path: '/Login'})
        }
      },
      //修改密码
      changePass() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8080/changePass', this.userForm).then(res => {
              if (res.data == "success") {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }else {
                this.$message.error('旧密码输入错误');
              }
            })
          } else {
            this.$message.error('密码输入错误');
            return false;
          }
        });
      },
      //删除订单
      handleDeleteOrder(index, row) {
        if (confirm("确认要删除吗")) {
          axios.delete('http://localhost:8080/deleteOrder1ById/' + row.id).then(res => {
            if (res.data = "success") {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getOrderList();
              this.getOrderListByPage();
            }
          })
        }
      }
      ,//部门名称筛选
      filterDname(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
      ,//性别筛选
      filterSex(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
      ,//工作筛选
      filterJob(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
      ,
      //判断是否登录
      isLogin() {
        if (sessionStorage.getItem('userName')) {
          this.$store.commit('userStatus', {uid:sessionStorage.getItem('userId'),uname: sessionStorage.getItem('userName')})
        } else {
          this.$router.push("/Login");
        }
      },
    }
    ,
    created() {
      this.isLogin();
      this.getMenu();
    }
    ,
    mounted() {
      // this.getFoodList();
      // this.getEmpList();
      // this.getFoodList();
      // this.getFoodListByPage();
      // this.getOrderListByPage();
      // this.getOrderList();
    }
    ,
    components: {
      "navigation-item": NavigationItem
    }
  }
</script>
<style scoped>

</style>
