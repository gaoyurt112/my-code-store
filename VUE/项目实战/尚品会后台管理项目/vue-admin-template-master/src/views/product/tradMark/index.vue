<template>
<div>
   <!-- 按钮 -->
   <el-button type="primary" icon="el-icon-plus" style="margin:10px 10px" @click="showDialog">添加</el-button>
   <!-- 表格组件 
   data:表格组件将来需要展示的数据----数组类型
   -->
   <el-table style="width: 100%;margin:0px 10px ;" border :data="list">
      <el-table-column
      type="index"
      label="序号"
      width="80px"
      align="center"
      >
      </el-table-column> 
       <el-table-column
      prop="tmName"
      label="品牌名称"
      width="width"
      align="center"
      >
      </el-table-column> 
       <el-table-column
      prop="logoUrl"
      label="品牌Logo"
      width="width"
      align="center"
      >
      <template slot-scope="{row}">
        <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
      </template>
      </el-table-column> 
       <el-table-column
      prop="tmName"
      label="操作"
      width="width"
      align="center"
      >
      <template scope="{row}">
        <!-- row就是这一行的信息 -->
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradMark(row)">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradMark(row)">删除</el-button>
      </template>
      </el-table-column> 
   </el-table>
   <!-- 分页器 -->
  <el-pagination 
  style="margin-top:20px;text-align: center;"
  :current-page="page"
  :total="total" 
  :page-size="limit"  
  :pager-count="7"
  :page-sizes="[3,5,10]" 
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  layout="prev,pager,next,jumper,->,sizes,total">
  </el-pagination>

  <!-- 对话框 -->
<el-dialog :title="this.tmForm.id? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
<!-- 表单  model手机表单数据-->
<!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
  <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
    <el-form-item label="品牌名称" label-width="100px" prop="tmName">
      <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
    </el-form-item>
    <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
      <!-- 这里收集数据不能使用V-model,因为不是表单元素
      action设置图片上传的地址
       :on-success  可以检测到图片的上传成功，当图片上传成功，会执行一次
        :before-upload 可以在上传图片之前，会执行一次
      -->
      <el-upload
  class="avatar-uploader"
  action="/dev-api/admin/product/fileUpload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdateTradMark">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>
       
       
<script>
export default{
name:'tradeMark',
data(){
   return{
      //分页器第几页
      page:1,
      //当前页面展示数据条数
      limit:3,
      //总数据条数
      total:0,
      //列表展示的数据
      list:[],
      //控制对话框显示与隐藏的属性
      dialogFormVisible:false,
      //收集数据的格式需要看后台文档，否则格式不对
      tmForm:{
          logoUrl:'' ,
           tmName:''
      },
      //表单验证的规则
      rules:{
        //品牌名称的验证规则
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌的图片', trigger: 'change' }
          ]
      }
   }
},
//组件挂载完毕发起请求
mounted(){
   this.getPageList();
},
methods:{
   //获取品牌列表的数据
  async getPageList(){
      //解构参数
      const { page,limit } = this;
      //获取品牌列表的接口
     let result = await this.$API.trademark.reqTradeMarkList(page, limit);
     if(result.code == 200){
        this.total = result.data.total
        this.list = result.data.records
     }
   },
   //分页刷新内容
   handleCurrentChange(pager){
      // console.log(pager);
     //修改参数
      this.page = pager
      this.getPageList()
   },
   //修改每页展示数据条数
   handleSizeChange(limit){
       //整理参数
       this.limit = limit
       this.getPageList()
   },
   //点击添加品牌的按钮
   showDialog(){
      //显示对话框
      this.dialogFormVisible = true
      //每次点击添加按钮都清除数据
      this.tmForm = {
         logoUrl:'' ,
           tmName:''
      }
   },
   //更新修改品牌数据
   updateTradMark(row){
     //row就是当前用户选择的品牌信息
    //  console.log(row);
    //将已有的品牌信息赋值给tmform进行展示
    //将服务器返回的品牌信息直接赋值给tmform
    //浅拷贝，复制一份给tmform
    this.tmForm = {...row}
    this.dialogFormVisible = true
   },
   //上传图片相关的回调
   //图片上传成功
    handleAvatarSuccess(res, file) {
      //res:上传成功之后服务器返回前端的数据
      //file:上传成功之后服务器返回的前端数据
      // console.log(res);
       this.tmForm.logoUrl = res.data
      },
    //图片上传之前
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
      //添加按钮或修改数据
      addOrUpdateTradMark(){
      //当全部验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async(success)=>{
          if(success){
      this.dialogFormVisible = false
      let result = await this.$API.trademark.reqAddOrUpdateTradeMarkList(this.tmForm)
      if(result.code == 200){
        //弹出信息：添加品牌成功,修改品牌成功
        this.$message({
          type:'success',
          message:this.tmForm.id? '修改品牌成功' : '添加品牌成功'
        })
        //添加或者修改品牌成功之后，需要再次获取品牌列表进行展示
        //如果添加品牌，停留在第一页，修改品牌应该停留在当前页
        this.getPageList(this.tmForm.id?this.page:1);
      }
          }else{
            // console.log("error submit!");
            return false
          }
      })
    },
    //删除品牌的操作
    deleteTradMark(row){
      // console.log(row);
       this.$confirm(`你确定要删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //当用户点击确定按钮的时候会触发
        }).then(async() => {
         let result = await this.$API.trademark.reqDeleteTradMark(row.id)
         if(result.code == 200){
             this.$message({
            type: 'success',
            message: '删除成功!' 
          }); 
          this.getPageList(this.list.length>1? this.page:this.page-1)
         }
        }).catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
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