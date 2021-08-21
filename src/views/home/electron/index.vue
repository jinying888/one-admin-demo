<template>
  <div class="about">
    <div>电子产品</div>
    <div class="add">
      <el-button type="text" @click="dialogFormVisible = true">新建</el-button>
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%"
      tooltip-effect="dark" @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'date', order: 'descending'}"
       @sort-change="mysort">
        <el-table-column type="selection" width="55">
            
        </el-table-column>
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column sortable="custom" prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="editForm(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </div>

    <div class="block pagelist">
        <el-pagination
          layout="prev, pager, next"
          :total="total" @current-change="currentChange" >
        </el-pagination>
      </div>
    <div class="view">
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <div>
          <p>name:123</p>
          <p>date:2021-01-02</p>
          <p>address: shanghai </p>
        </div>
      </el-dialog>
    </div>

    <div class="add">
      
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :width="formWidth">
        <el-form ref="form" :rules="rules"  :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="contents">
            <quill-editor v-model="form.contents" :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="edit">
      
      <el-dialog title="收货地址编辑" :visible.sync="dialogEditFormVisible">
        <el-form ref="form" :rules="rules"  :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onEditSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>


  
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: "electron",
  components: {
    quillEditor
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dialogTableVisible: false,      // view one row data 
      dialogFormVisible: false,       // add from 
      dialogEditFormVisible: false,   // edit from 
      form: {
        name: '',
        address: '',
        contents: '',
      },
      rules: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ],
      },
      formLabelWidth: '120px',
      formWidth: '80%',
      total: 10,    // total nums
      currentPage:1,  // current page
      editorOption:{
        placeholder: '',
        theme: 'snow',
        modules: {
          //自定义工具栏 https://www.kancloud.cn/liuwave/quill/1409423
          toolbar:  [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
          ]
        }
      }

      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getList(1)
    },
    handleClick(row) {
      //显示对话框，查看数据
      this.dialogTableVisible = true
      console.log(row);
    },
    
    handleSelectionChange(val) {
        this.multipleSelection = val;

    },
    mysort(sort_prarm){
        console.log(sort_prarm)
    },
    currentChange(page_num){
        // console.log(page_num)
        this.getList(page_num)
        //save current page
        this.currentPage = page_num
    },
    getList(page_num){
      this.$http.get('/api/demo/electron_list',{params:{page:page_num}}).then(res=>{
            let {code, data} = res.data
            
            this.tableData = data.data
            this.total = Number(data.total)
            
      })
      
    },
    onAddSubmit(){
      // judge data is or not valid
      let isValid = true
      this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            isValid = false
          }
      });


      if(isValid === false){
        return false
      }
      
      this.dialogFormVisible = false;
      this.$http.post('/api/demo/addproduct',this.form).then(res=>{
        
        let {code, data} = res.data

        if(code == 1){
          //add success , refresh list
          // console.log(code);
          this.getList(1)
        }else{
          console.log(data)
        }
          
      })
    },
    editForm(id){
      this.$http.get('/api/demo/getproduct',{params:{'id':id}}).then(res=>{
        
        let {code, data} = res.data

        if(code == 1){
          // console.log(code);
          this.form = data
          this.dialogEditFormVisible = true
        }else{
          console.log(data)
        }
          
      })
      
    },
    onEditSubmit(){
      let isValid = true
      this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            isValid = false
          }
      });


      if(isValid === false){
        return false
      }
      
      this.dialogEditFormVisible = false;
      this.$http.post('/api/demo/editproduct',this.form).then(res=>{
        
        let {code, data} = res.data

        if(code == 1){
          //add success , refresh list
          this.getList(this.currentPage)
        }else{
          console.log(data)
        }
          
      })
    }

  },
};
</script>

<style scoped>

</style>