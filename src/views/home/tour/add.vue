<template>

      <div class="add">
        <el-form ref="form" :model="form" class="myform"  :label-width="formLabelWidth">
          <el-form-item label="景点名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="景点简称" prop="abbreviate_name">
            <el-input v-model="form.abbreviate_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="几星" prop="star">
            <el-select v-model="form.star" placeholder="请选择">
              <el-option
                v-for="item in star_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区分类" prop="district">
          <el-cascader
            size="large"
            :options="options"
            v-model="form.district"
            @change="handleChange">
          </el-cascader>
          </el-form-item>
          <el-form-item label="景点图片" prop="image">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://www.phpersky.com/api/demo/uploadimg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="form.latitude" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="景点描述" prop="contents">
            <quill-editor v-model="form.contents" :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="是否展示" prop="status">
            <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#333333"></el-switch>
          </el-form-item>
          
        </el-form>
        
        <el-button type="primary" @click="onAddSubmit">确 定</el-button>

    </div>
      
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
    data() {
      return {
        
        formLabelWidth: '200px',
        form: {
          name: '',
          star: '5',
          
        },
        star_options: [{
          value: '2',
          label: '2星'
        }, {
          value: '3',
          label: '3星'
        }, {
          value: '4',
          label: '4星'
        }, {
          value: '5',
          label: '5星'
        }, {
          value: '6',
          label: '6星'
        },
        ],
        options: regionDataPlus,
        fileList: [],
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
      }
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        console.log('remove file')
        
      },
      handlePreview(file) {
        // console.log(file);
        console.log('preview file')
      },
      handleSuccess(respo,file,fileList){
        console.log('upload success')
        // 只取最新上传的图片，所以只有一张有效
        this.fileList = [fileList[fileList.length - 1]];
        // 可以传多张图片
        // this.fileList = fileList
      },
      onAddSubmit(){
        console.log(this.fileList.length)
        if(this.fileList.length !== 0){
          this.form.image = this.fileList[0].response.data.url;
          this.form.image_name = this.fileList[0].response.data.name;
        }
        

        this.$http.post('/api/tour/addplace?a=1',this.form).then(res=>{
        
        let {code, data} = res.data
        console.log(data);
        if(code == 1){
          //add success
          console.log(code);
          alert('add success')
        
        }else{
          console.log(data)
          alert('add fail')
        }
          
        })
      },
      handleChange (value) {
        console.log(value)
        value.forEach( function(item){
          console.log(CodeToText[item])
        } )
      }
    }
}
</script>

<style scoped>
  .myform {
    width:80%
  }
</style>