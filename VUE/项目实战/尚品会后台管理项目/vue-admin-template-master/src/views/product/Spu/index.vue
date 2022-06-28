<template>
  <div>
    <el-card style="margin: 20px 10px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card style="margin: 0px 10px">
      <!-- 这部分有三个状态切换 -->
      <div v-show="scene === 0">
        <!-- 展示spu结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="Spu名称"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              {{ row.spuName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="Spu描述"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              {{ row.description }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="350" align="center">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                size="mini"
                icon="el-icon-more-outline"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></el-button>
              <template>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm="deleteSpu(row)"
                >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    title="删除spu"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="prev,pager,next,jumper,->,sizes,total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm v-show="scene === 2" @changeScene="changeScene" @changeScenes="changeScenes" ref="sku"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的Sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
  <el-table :data="skuList" border style="width:100%" v-loading="loading">
    <el-table-column  prop="skuName" label="名称" width="width" align="center"></el-table-column>
    <el-table-column  prop="price" label="价格" width="width" align="center"></el-table-column>
    <el-table-column  prop="weight" label="重量" width="width" align="center"></el-table-column>
    <el-table-column  label="默认图片" width="width" align="center">
   <template slot-scope="{row}">
      <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
   </template>
    </el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>

<script>
import SpuForm from "./spuform/index.vue";
import SkuForm from "./skuform/index.vue";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [], //spu列表
      total: 0,
      scene: 0, //0代表展示spu列表数据
      dialogTableVisible:false, //控制对话框的显示与隐藏
      spu:[],
      skuList:[],//存储sku列表的数据
      loading:true
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      //区分三级分类相应的id,以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        //当一级id发生变化时，清空二级三级id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //代表三级组件有了
        this.category3Id = categoryId;
        //发请求获取spu属性
        this.getSpuList();
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqgetSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //分页刷新内容
    handleCurrentChange(page) {
      // console.log(pager);
      //修改参数
      this.page = page;
      this.getSpuList();
    },
    //修改每页展示数据条数
    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      this.getSpuList();
    },
    //添加spu
    addSpu() {
      this.scene = 1;
      //通知子组件spuForm发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改spu
    editSpu(row) {
      this.scene = 1;
      //获取子组件souform
      this.$refs.spu.initSpuData(row);
    },
    //切换结构
    changeScene({ scene, flag }) {
      //falg为了区分添加还是修改
      this.scene = scene;
      //子组件通知父组件切换结构的时候重新获取数据
      this.getSpuList();
      if (flag === "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1? this.page : this.page -1 );
      }
    },
    //添加sku的回调
    addSku(row){
      //切换场景
      this.scene = 2
      //父组件通知子组件发起请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row);
    },
    //skuForm通知父组件切换场景
    changeScenes(scene){
    this.scene = scene
    },
    //查看所有sku的回调
    async handler(row){
      //点击时对话框可见
      this.dialogTableVisible = true;
      //保存row信息
      this.spu = row
      //获取sku列表数据进行展示
      let result = await this.$API.spu.reqSkuList(row.id);
      if(result.code == 200){
         this.skuList = result.data
         this.loading = false
      }
    },
    //关闭对话框的回调
    close(done){
    //将loading变为true
    this.loading = true;
    //清空sku列表
    this.skuList = [];
    //关闭对话框
    done()
    },
  }, 
};
</script>

<style></style>
