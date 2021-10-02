<template>
  <div class="about">
    
    <div>旅游景点</div>
    <div>
      
      <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%"
      tooltip-effect="dark" @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'date', order: 'descending'}"
       @sort-change="mysort">
        <el-table-column type="selection" width="55">
            
        </el-table-column>
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column sortable="custom" prop="name" label="景点名称" width="180">
        </el-table-column>
        <el-table-column prop="star" label="星级" width="180">
        </el-table-column>
        
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="editForm(scope.row)" >编辑</el-button>
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
   
  </div>
  
</template>
<script>

export default {
  name: "tour",

  data() {
    return {
      tableData: [],
      multipleSelection: [],

      toUrl: '',
      
      total: 10,    // total nums
      currentPage:1,  // current page
    }
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
      this.$http.get('/api/tour/alist',{params:{page:page_num}}).then(res=>{
            let {code, data} = res.data
            
            this.tableData = data.data
            this.total = Number(data.total)
            
      })
      
    },
    editForm(id){
      console.log(id.id)
      var id = id.id
      this.$router.push({ path: `/tour/add/${id}` })
    },

 

  },
};
</script>

<style scoped>

</style>