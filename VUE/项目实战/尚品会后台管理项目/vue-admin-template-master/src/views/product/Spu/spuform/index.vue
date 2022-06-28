<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择" v-model="spu.tmId">
          <el-option
            v-for="tm in TradeMarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--  :file-list="spuImageList" 展示照片墙 照片墙需要展示的数据【数组：数组里面的元素务必要有name,url属性】
        on-preview图片预览功能
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            v-for="unSelect in unSelectSaleAttr"
            :key="unSelect.id"
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width=""
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="saleAttrValueName"
            label="销售值名称列表"
            width=""
            align="center"
          >
            <template slot-scope="{ row }">
              <!-- el-tag展示已有的属性值列表 -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150" align="center">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: '',
        //收集spu图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        //平台属性与属性值的收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isCheckd: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      TradeMarkList: [], //存储品牌信息属性
      spuImageList: [], ////存储spu图片
      saleAttrList: [], //存储平台销售属性
      attrId: "", //收集未选择的销售属性的id
      attrIdAndAttrName: "",
    };
  },
  methods: {
    //照片墙删除某一个图片的回调
    handleRemove(file, fileList) {
      //file参数代表的是删除的图片
      //fileList是剩余的图片
      // console.log(file, fileList);
      //收集照片墙图片的数据
      //对于已有的图片，照片墙中显示的图片有name,url字段，因为照片墙显示数据务必有这两个属性
      //对于服务器而言，不需要name,url字段，将来对于有的图片的数据在提交时需要处理
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    //初始化spu数据
    async initSpuData(spu) {
      //获取spu基本信息
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      //修改也需要向服务器发送请求
      //  console.log(spuResult);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌信息数据
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.TradeMarkList = tradeMarkResult.data;
      }
      //获取图片数据
      let ImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(ImageResult);
      if (ImageResult.code == 200) {
        //将服务器返回的数据进行修改
        let listArry = ImageResult.data;
        listArry.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // console.log(listArry);
        this.spuImageList = listArry;
      }
      //获取平台全部销售属性 一共三个
      let saleAttrResult = await this.$API.spu.reqbaseSaleAttrList();
      // console.log(saleAttrResult);
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data;
      }
      // console.log("发送请求", spu);
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    //添加新的属性的回调
    addSaleAttr() {
      //已经收集到了需要添加销售属性的名称
      //把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向spuSaleAttrList中添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空数据
      this.attrIdAndAttrName = "";
    },
    //添加新的销售属性值按钮的回调
    addSaleAttrValue(row) {
      //将button切换为input
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      //解构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性值的名称不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }

      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) {
        return;
      }
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //控制按钮输入框切换
      row.inputVisible = false;
    },
    //修改或添加的保存按钮的回调
    async addOrUpdateSpu() {
      //整理参数：整理图片参数
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if(result.code == 200){
        this.$message({type:'success',message:'保存成功'})
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
      }
      Object.assign(this._data,this.$options.data())
    },
    //点击添加按钮之后发请求的函数
    async addSpuData(category3Id){
      //点击添加spu的时候收集3id
      this.spu.category3Id = category3Id
    //获取品牌列表
    let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.TradeMarkList = tradeMarkResult.data;
      }

       //获取平台全部销售属性 一共三个
      let saleAttrResult = await this.$API.spu.reqbaseSaleAttrList();
      // console.log(saleAttrResult);
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data;
      }
    },
    cancel(){
      //取消按钮的回调，通知切换场景为0
      this.$emit('changeScene',{scene:0,flag:''})
      //清理数据
     //object.assign()是es6中的新增方法，可以合并对象
      Object.assign(this._data,this.$options.data())
    }
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台一共有三个销售属性
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
