<template>
  <div>
    <el-card style="margin: 20px 10px">
      <!-- 子父组件通信使用自定事件 -->
      <!-- 通过props传递数据给三级联动组件控制启用与禁用 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>

    <el-card style="margin: 0px 10px">
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格展示平台属性 -->
        <el-table style="width: 100%; margin-top: 20px" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="col.id" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 10px"
                type="danger"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="col.id" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
                >修改</el-button
              >
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAttr(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性或者修改属性的解构 -->
      <div v-show="!isShowTable">
        <el-form label-width="80px" :inline="true" ref="form" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 旗袍确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="SaveAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入lodash深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性的数据
      attrList: [],
      //是否显示table表格
      isShowTable: true,
      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //属性值，因为属性值可以是多个，因此需要的是数组，每一个属性值都是一个对象选哟attrId,valueName
        categoryId: 0, //三级分类的id
        // categoryId: this.category3Id,//无法获取数据，因为对象中的数据是无序的
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
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
        //发请求获取品牌属性
        this.getAttrList();
      }
    },
    //获取平台属性的数据
    //当用户确定了三级分类的数据时候，可以向服务器发送请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      //    console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值的回调
    addAttrValue() {
      //向属性值attrValueList的数组里面添加元素
      this.attrInfo.attrValueList.push({
        //attrid:是你相应属性的id,目前而言我们是添加属性的操作，还没有相应的属性值的id,目前而言带给服务器的id为undefined
        //valueName相应属性值的名称
        attrId: this.attrInfo.id, //相应属性名的id 对于修改某一个属性的的时候，可以在已有的属性值基础之上新增的属性值(新增属性值的同时，需要将已有的属性id赋值)
        valueName: "",
        flag: true, //让每一个属性添加一个flag,用于切换input输入框和span标签
      });
      //最后一个input聚焦
      this.$nextTick(() => {
        //获取相应的表单元素实现聚焦
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性取消按钮的回调
    addAttr() {
      //切换显示和隐藏
      this.isShowTable = false;
      //重置attrinfo
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id, //这里可以收集到三级分类的id
        categoryLevel: 3,
      };
    },
    //修改属性值的回调
    updateAttr(row) {
      this.isShowTable = false;
      //因为对象中存在多层嵌套，所以浅拷贝无效，需要使用深拷贝
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        //这样做可以给属性值添加flag但是不是响应式数据
        //Vue.set( target, propertyName/index, value )
        //向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property
        this.$set(item, "flag", false);
      });
    },
    //切换编辑模式
    toLook(row) {
      //判断用户输入是否为有效的属性名称
      if (row.valueName.trim() == "") {
        this.$message("请输入正确的属性名！");
        return;
      }
      //新增的属性值不能与已有的属性值发生冲突
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //判断如果当前row不等于数组内的元素，返回一个布尔值
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      //如果发生重复提示用户不进行任何操作
      if (isRepat) {
        this.$message("属性重复请重新输入新的属性!");
        return;
      }
      row.flag = false;
    },
    //点击span的回调，变为编辑模式
    toEdit(row, index) {
      row.flag = true;
      //获取input节点
      //当点击span标签切换为input时，浏览器重绘需要时间，并不能立马获取input元素
      //$nextTick，当节点渲染完毕，会执行一次
      this.$nextTick(() => {
        //获取相应的表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    //气泡确认框删除属性的回调
    deleteAttrValue(index){
    //当前删除操做不需要发送请求
    this.attrInfo.attrValueList.splice(index,1)
    },
    //发送数据到服务器保存属性
   async SaveAttr(){
    this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
       if(item.valueName !==''){
        delete item.flag
        return true
       }
    })
    
    try {
      let result =  await this.$API.attr.reqAddAttr(this.attrInfo);
      console.log(result);
       this.isShowTable = true;
       this.$message({type:'success',message:'保存成功'});
       this.getAttrList();
    } catch (error) {
      this.$message('保存失败!');
    }
    },
     //删除属性的操作
    deleteAttr(row){
      // console.log(row);
       this.$confirm(`你确定要删除${row.attrName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //当用户点击确定按钮的时候会触发
        }).then(async() => {
         let result = await this.$API.attr.reqDeleteAddAttr(row.id)
         if(result.code == 200){
             this.$message({
            type: 'success',
            message: '删除成功!' 
          }); 
          this.getAttrList()
         }
        }).catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style></style>
