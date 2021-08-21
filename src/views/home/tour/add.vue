<template>

      <div class="add">
        <el-form ref="form" :rules="rules" :model="form" class="myform"  :label-width="formLabelWidth">
          <el-form-item label="景点名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="几星" prop="star">
            <el-input v-model="form.star" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地理分类" prop="geo_category">
            <el-input v-model="form.geo_category" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="架构" prop="framework">
            <el-input v-model="form.framework" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="景点图片" prop="form.image">
            <el-upload
              class="upload-demo"
              action="http://www.phpersky.com/api/demo/uploadimg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture">
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
          
        },
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
        //console.log(respo.img_url)
        this.fileList.push(respo.data)
        // console.log(fileList)
      },
      onAddSubmit(){
        this.form.image = this.fileList[0].url;
        console.log(this.form.image,this.fileList[0].url)
        // this.$http.post('/api/electron/addvcard',this.form).then(res=>{
        
        // let {code, data} = res.data

        // if(code == 1){
        //   //add success
        //   console.log(code);
        
        // }else{
        //   console.log(data)
        // }
          
        // })
      }
    }
}
</script>

<style scoped>
  .myform {
    width:80%
  }
</style>