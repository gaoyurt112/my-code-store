<template>
  <div>
    <el-table
      style="width: 100%; margin-left: 10px; margin-top: 20px"
      border
      :data="this.records"
    >
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="col.width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="col.width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="skuDefaultImg"
        label="默认图片"
        width="130"
        align="center"
      >
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="col.width"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-top"
            title="上架"
            v-if="row.isSale == 0"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-bottom"
            title="下架"
            @click="cancelSale(row)"
            v-else
          ></el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            title="修改sku"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看当前spu全部sku列表"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            title="删除sku"
            slot="reference"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器   @size-change="sizeChange"
        @current-change="currentChange" -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="currentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(attr) in skuInfo.skuAttrValueList"
              :key="attr.id"
              style="margin: 0px 5px"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
             <img :src="item.imgUrl" alt="" style="width:500px;height:500px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储sku列表的数据
      total: 0, //存储分页器一共展示的数据
      skuInfo: {},
      show: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取sku列表的方法
    async getSkuList() {
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //分页器刷新
    currentChange(page) {
      this.page = page;
      this.getSkuList();
    },
    //修改每页展示数据条数
    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      this.getSkuList();
    },
    //上架的回调
    async onSale(row) {
      let onresult = await this.$API.sku.reqOnSale(row.id);
      if (onresult.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功！" });
      }
    },
    //下架的回调
    async cancelSale(row) {
      let cancelresult = await this.$API.sku.reqCancelSale(row.id);
      if (cancelresult.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功！" });
      }
    },
    edit() {
      this.$message("正在开发中...");
    },
    //获取skuinfo的回调
    async getSkuInfo(sku) {
      this.show = true;
      let getSkuresult = await this.$API.sku.reqSkuInfo(sku.id);
      if (getSkuresult.code == 200) {
        this.skuInfo = getSkuresult.data;
      }
    },
  },
};
</script>

<style>
.el-row .el-col-5 {
  font-size: 18px;
  font-weight: 800;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel--horizontal{
    width: 500px;
  }
  .el-carousel__container{
    width: 500px;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
