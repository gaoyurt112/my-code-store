<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="Spu名称"> {{spu.spuName}} </el-form-item>
      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px" ref="form">
          <el-form-item :label="attr.attrName" v-for="(attr) in attrInfoList" :key="attr.id">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(attrValue) in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px" ref="form">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr) in spuAttrList" :key="saleAttr.id">
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(saleAttrValue) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="80" align="center"> 
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width" align="center">
            <template slot-scope="{row}">
                <img :src="row.imgUrl" style="width:100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" key="" label="名称" width="" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
             <el-button type="primary" size="default" @click="changeDefault(row)" v-if="row.isDefault == 0">设为默认</el-button>
             <el-button v-else>默认</el-button>
            </template>
           
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save()">保存</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      spuImageList: [],
      spuAttrList: [],
      attrInfoList: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类收集的数据，父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类需要通过数据双向绑定获取的数据
        skuName: "",
        weight: 0,
        price: 0, 
        skuDesc: "",   
        
        //第三类需要自己书写代码
        skuDefaultImg: "", //默认图片
        //收集图片的数据
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //收集销售属性列表的数据
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu:{},
    //收集图片的数据字段 注意当前收集的数据当中，缺少isDefault字段
    imageList:[]
    };
  },
  methods: {
    //获取skuform数据
    async getData(category1Id, category2Id, row) {
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      this.spu = row
      //获取图片的数据
      let ImageResult = await this.$API.spu.reqSpuImageList(row.id);
      if (ImageResult.code == 200) {
        let list = ImageResult.data;
        list.forEach(item=>{
          item.isDefault = 0;
        })
      this.spuImageList = list
      }
      // 获取销售属性的数据
      let attrResult = await this.$API.spu.reqSpuSaleAttrList(row.id);
      if (attrResult.code == 200) {
        this.spuAttrList = attrResult.data;
      }

      //获取平台属性的接口
      let attrInfoResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        row.category3Id
      );
      if (attrInfoResult.code == 200) {
        this.attrInfoList = attrInfoResult.data;
      }
    },
    //table表格复选框按钮的事件
    handleSelectionChange(val){
    //  console.log(val);
    //获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
    this.imageList = val
    },
    //排他操作
    changeDefault(row){
    //图片列表的数据的isDefault字段变为0
    this.spuImageList.forEach(item=>{
      item.isDefault = 0;
    });
    row.isDefault = 1;
    //收集默认图片的地址
    this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //取消操作
    cancel(){
      //通知父组件切换场景为0
      this.$emit('changeScenes',0);
      //清除数据
      Object.assign(this._data,this.$options.data())
    },
    //保存按钮的事件
   async save(){
     //整理参数
     //整理平台属性
     const {attrInfoList,skuInfo,spuAttrList,imageList} = this;
     //把收集到的数据整理
     attrInfoList.forEach(item=>{
      //当前平台用户进行选择
      if(item.attrIdAndValueId){
        const [attrId,valueId] = item.attrIdAndValueId.split(":")
        //携带给服务器参数应该是对象
        let obj = {attrId,valueId}
        skuInfo.skuAttrValueList.push(obj)
      }
     });

    spuAttrList.forEach(item2=>{
      if(item2.attrIdAndValueId){
        const [saleAttrId,saleAttrValueId] = item2.attrIdAndValueId.split(":")
        let obj2 = {saleAttrId,saleAttrValueId}
        skuInfo.skuSaleAttrValueList.push(obj2)
      }
    });

   //整理图片的数据
   skuInfo.skuImageList = imageList.map(item=>{
    return{
      imgName:item.imgName,
      imgUrl:item.imgUrl,
      isDefault:item.isDefault,
      spuImgId:item.id
    }
   })
   //发请求
  let result = await this.$API.spu.reqAddSku(skuInfo)
   if(result.code == 200){
    this.$message({typr:'success',message:'保存成功'})
    this.$emit('changeScenes',0)
   }
    }
  },
};
</script>

<style></style>
