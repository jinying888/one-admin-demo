<template>
  <div class="login">
    <div>管理系统</div>
    <div>
      <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="username" prop="username">
          <el-input v-model="formData.username" placeholder="请输入username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="formData.password" placeholder="请输入password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('formData')">login</el-button>
          <el-button @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          password: '',
          
        },
        rules:{
          username:[
            {required: true, message: '请输入用户名',trigger:'blur'},
            {min:3, max:7, message: '长度在3到18个字符',trigger: 'blur'}
          ],
          password:[
            {required: true, message: '请输入密码',trigger:'blur'},
            {min:3, max:18, message: '长度在3到18个字符',trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username, password} = this.formData
            console.log('login success!')
            sessionStorage.setItem('username',username)
            this.$router.push('/home')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      
      }
    }
  }
</script>
