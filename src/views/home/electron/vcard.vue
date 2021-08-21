<template>
  <div class="about">
    <el-row>
      <el-col :span="3">显卡</el-col>
      <el-col :span="3"><el-button type="text" @click="dialogFormVisible = true">新建</el-button></el-col>
    </el-row>
    
    <div>
      <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%"
      tooltip-effect="dark" @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'market_time', order: 'descending'}"
       @sort-change="mysort">
        <el-table-column type="selection" width="55">
            
        </el-table-column>
        <el-table-column prop="id" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="brand" label="品牌"> </el-table-column>
        <el-table-column sortable="custom" prop="market_time" label="上市日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="code_name" label="核心代号"> </el-table-column>
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
      
      <el-dialog title="参数" :visible.sync="dialogFormVisible" :width="formWidth">
        <el-form ref="form" :rules="rules"  :model="form">
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
            <el-input v-model="form.brand" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系列series" :label-width="formLabelWidth" prop="series">
            <el-input v-model="form.series" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="架构" :label-width="formLabelWidth" prop="framework">
            <el-input v-model="form.framework" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上市日期" :label-width="formLabelWidth" prop="market_time">
            <el-input v-model="form.market_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="代号" :label-width="formLabelWidth" prop="code_name">
            <el-input v-model="form.code_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="制造工艺" :label-width="formLabelWidth" prop="technology">
            <el-input v-model="form.technology" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="晶体管数" :label-width="formLabelWidth" prop="transistor_nums">
            <el-input v-model="form.transistor_nums" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="流处理器" :label-width="formLabelWidth" prop="stream_processor">
            <el-input v-model="form.stream_processor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纹理单元" :label-width="formLabelWidth" prop="tmu">
            <el-input v-model="form.tmu" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="光栅单元" :label-width="formLabelWidth" prop="rop">
            <el-input v-model="form.rop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计算单元" :label-width="formLabelWidth" prop="cu_sm">
            <el-input v-model="form.cu_sm" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="光线追踪核心" :label-width="formLabelWidth" prop="ray_trace">
            <el-input v-model="form.ray_trace" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Infinity Cache" :label-width="formLabelWidth" prop="amd_infinity_cache">
            <el-input v-model="form.amd_infinity_cache" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Tensor核心数" :label-width="formLabelWidth" prop="nvidia_tensor_core_nums">
            <el-input v-model="form.nvidia_tensor_core_nums" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="二级缓存" :label-width="formLabelWidth" prop="nvidia_level2cache">
            <el-input v-model="form.nvidia_level2cache" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时钟频率【基础】" :label-width="formLabelWidth" prop="clock_rate_base">
            <el-input v-model="form.clock_rate_base" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时钟频率【加速】" :label-width="formLabelWidth" prop="clock_rate_accelerate">
            <el-input v-model="form.clock_rate_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存频率" :label-width="formLabelWidth" prop="clock_rate_memory">
            <el-input v-model="form.clock_rate_memory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="像素填充率" :label-width="formLabelWidth" prop="pixel_filling_rate">
            <el-input v-model="form.pixel_filling_rate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="材质填充率" :label-width="formLabelWidth" prop="material_filling_rate">
            <el-input v-model="form.material_filling_rate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存容量" :label-width="formLabelWidth" prop="graphics_memory_capacity">
            <el-input v-model="form.graphics_memory_capacity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存带宽" :label-width="formLabelWidth" prop="graphics_memory_bandwidth">
            <el-input v-model="form.graphics_memory_bandwidth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存类型" :label-width="formLabelWidth" prop="graphics_memory_type">
            <el-input v-model="form.graphics_memory_type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存位宽" :label-width="formLabelWidth" prop="graphics_memory_buswidth">
            <el-input v-model="form.graphics_memory_buswidth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单精度运算" :label-width="formLabelWidth" prop="flops_single_precision">
            <el-input v-model="form.flops_single_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单精度运算【加速】" :label-width="formLabelWidth" prop="flops_single_precision_accelerate">
            <el-input v-model="form.flops_single_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="双精度运算" :label-width="formLabelWidth" prop="flops_double_precision">
            <el-input v-model="form.flops_double_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="双精度运算【加速】" :label-width="formLabelWidth" prop="flops_double_precision_accelerate">
            <el-input v-model="form.flops_double_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="半精度运算" :label-width="formLabelWidth" prop="flops_half_precision">
            <el-input v-model="form.flops_half_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="半精度运算【加速】" :label-width="formLabelWidth" prop="flops_half_precision_accelerate">
            <el-input v-model="form.flops_half_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="RT Core" :label-width="formLabelWidth" prop="nvidia_rt_core">
            <el-input v-model="form.nvidia_rt_core" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Tensor Core" :label-width="formLabelWidth" prop="nvidia_tensor_core">
            <el-input v-model="form.nvidia_tensor_core" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总线接口" :label-width="formLabelWidth" prop="bus_interface">
            <el-input v-model="form.bus_interface" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="TDP热设计功耗" :label-width="formLabelWidth" prop="thermal_design_power">
            <el-input v-model="form.thermal_design_power" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="推荐电源功率" :label-width="formLabelWidth" prop="computer_power">
            <el-input v-model="form.computer_power" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显卡长度" :label-width="formLabelWidth" prop="size_length">
            <el-input v-model="form.size_length" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="占用插槽数" :label-width="formLabelWidth" prop="occupy_slots">
            <el-input v-model="form.occupy_slots" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="NV LINK" :label-width="formLabelWidth" prop="nvidia_link">
            <el-input v-model="form.nvidia_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="输出连接" :label-width="formLabelWidth" prop="screen_link">
            <el-input v-model="form.screen_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大分辨率" :label-width="formLabelWidth" prop="max_screen_resolution">
            <el-input v-model="form.max_screen_resolution" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="首发价格" :label-width="formLabelWidth" prop="issue_price">
            <el-input v-model="form.issue_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数概述" :label-width="formLabelWidth" prop="contents">
            <quill-editor v-model="form.contents" :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="是否展示" :label-width="formLabelWidth" prop="status">
            <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#333333"></el-switch>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="edit">
      
      <el-dialog title="显卡编辑" :visible.sync="dialogEditFormVisible" :width="formWidth">
        <el-form ref="form" :rules="rules"  :model="form">
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
            <el-input v-model="form.brand" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系列series" :label-width="formLabelWidth" prop="series">
            <el-input v-model="form.series" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="架构" :label-width="formLabelWidth" prop="framework">
            <el-input v-model="form.framework" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上市日期" :label-width="formLabelWidth" prop="market_time">
            <el-input v-model="form.market_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="代号" :label-width="formLabelWidth" prop="code_name">
            <el-input v-model="form.code_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="制造工艺" :label-width="formLabelWidth" prop="technology">
            <el-input v-model="form.technology" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="晶体管数" :label-width="formLabelWidth" prop="transistor_nums">
            <el-input v-model="form.transistor_nums" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="流处理器" :label-width="formLabelWidth" prop="stream_processor">
            <el-input v-model="form.stream_processor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纹理单元" :label-width="formLabelWidth" prop="tmu">
            <el-input v-model="form.tmu" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="光栅单元" :label-width="formLabelWidth" prop="rop">
            <el-input v-model="form.rop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计算单元" :label-width="formLabelWidth" prop="cu_sm">
            <el-input v-model="form.cu_sm" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="光线追踪核心" :label-width="formLabelWidth" prop="ray_trace">
            <el-input v-model="form.ray_trace" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Infinity Cache" :label-width="formLabelWidth" prop="amd_infinity_cache">
            <el-input v-model="form.amd_infinity_cache" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Tensor核心数" :label-width="formLabelWidth" prop="nvidia_tensor_core_nums">
            <el-input v-model="form.nvidia_tensor_core_nums" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="二级缓存" :label-width="formLabelWidth" prop="nvidia_level2cache">
            <el-input v-model="form.nvidia_level2cache" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时钟频率【基础】" :label-width="formLabelWidth" prop="clock_rate_base">
            <el-input v-model="form.clock_rate_base" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时钟频率【加速】" :label-width="formLabelWidth" prop="clock_rate_accelerate">
            <el-input v-model="form.clock_rate_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存频率" :label-width="formLabelWidth" prop="clock_rate_memory">
            <el-input v-model="form.clock_rate_memory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="像素填充率" :label-width="formLabelWidth" prop="pixel_filling_rate">
            <el-input v-model="form.pixel_filling_rate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="材质填充率" :label-width="formLabelWidth" prop="material_filling_rate">
            <el-input v-model="form.material_filling_rate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存容量" :label-width="formLabelWidth" prop="graphics_memory_capacity">
            <el-input v-model="form.graphics_memory_capacity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存带宽" :label-width="formLabelWidth" prop="graphics_memory_bandwidth">
            <el-input v-model="form.graphics_memory_bandwidth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存类型" :label-width="formLabelWidth" prop="graphics_memory_type">
            <el-input v-model="form.graphics_memory_type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显存位宽" :label-width="formLabelWidth" prop="graphics_memory_buswidth">
            <el-input v-model="form.graphics_memory_buswidth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单精度运算" :label-width="formLabelWidth" prop="flops_single_precision">
            <el-input v-model="form.flops_single_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单精度运算【加速】" :label-width="formLabelWidth" prop="flops_single_precision_accelerate">
            <el-input v-model="form.flops_single_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="双精度运算" :label-width="formLabelWidth" prop="flops_double_precision">
            <el-input v-model="form.flops_double_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="双精度运算【加速】" :label-width="formLabelWidth" prop="flops_double_precision_accelerate">
            <el-input v-model="form.flops_double_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="半精度运算" :label-width="formLabelWidth" prop="flops_half_precision">
            <el-input v-model="form.flops_half_precision" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="半精度运算【加速】" :label-width="formLabelWidth" prop="flops_half_precision_accelerate">
            <el-input v-model="form.flops_half_precision_accelerate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="RT Core" :label-width="formLabelWidth" prop="nvidia_rt_core">
            <el-input v-model="form.nvidia_rt_core" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Tensor Core" :label-width="formLabelWidth" prop="nvidia_tensor_core">
            <el-input v-model="form.nvidia_tensor_core" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总线接口" :label-width="formLabelWidth" prop="bus_interface">
            <el-input v-model="form.bus_interface" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="TDP热设计功耗" :label-width="formLabelWidth" prop="thermal_design_power">
            <el-input v-model="form.thermal_design_power" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="推荐电源功率" :label-width="formLabelWidth" prop="computer_power">
            <el-input v-model="form.computer_power" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显卡长度" :label-width="formLabelWidth" prop="size_length">
            <el-input v-model="form.size_length" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="占用插槽数" :label-width="formLabelWidth" prop="occupy_slots">
            <el-input v-model="form.occupy_slots" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="NV LINK" :label-width="formLabelWidth" prop="nvidia_link">
            <el-input v-model="form.nvidia_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="输出连接" :label-width="formLabelWidth" prop="screen_link">
            <el-input v-model="form.screen_link" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大分辨率" :label-width="formLabelWidth" prop="max_screen_resolution">
            <el-input v-model="form.max_screen_resolution" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="首发价格" :label-width="formLabelWidth" prop="issue_price">
            <el-input v-model="form.issue_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数概述" :label-width="formLabelWidth" prop="contents">
            <quill-editor v-model="form.contents" :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="是否展示" :label-width="formLabelWidth" prop="status">
            <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#333333"></el-switch>
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
        // contents: '',

      },
      rules: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
      this.$http.get('/api/electron/vcard_list',{params:{page:page_num}}).then(res=>{
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
      this.$http.post('/api/electron/addvcard',this.form).then(res=>{
        
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
      this.$http.get('/api/electron/getvcard',{params:{'id':id}}).then(res=>{
        
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
      this.$http.post('/api/electron/editvcard',this.form).then(res=>{
        
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
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    
  }
</style>