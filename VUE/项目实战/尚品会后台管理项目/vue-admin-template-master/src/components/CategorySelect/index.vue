<template>
  <div>
    <!-- inLine:代表的是行内表单，代表一行可以放置多个表单元素 -->
    <!-- ：model表示数据收集到了cform里 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <!-- 将一级分类id收集进cform -->
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in List1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
           :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in List2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
           :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in List3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      //一级分类的数据
      List1: [],
      //二级分类的数据
      List2: [],
      //三级分类的数据
      List3: [],
      //收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  //组件挂载完毕，向服务器发送请求，获取一级分类的数据
  mounted() {
    //获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      //获取一级分类的请求，不需要携带参数
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if (result.code == 200) {
        this.List1 = result.data;
      }
    },
    //一级分类的select事件的回调（当一级分类的option发生变化时获取响应二级分类的数据）
    async handler1() {
      //清除上一次残留的数据
      this.List2 = [];
      this.List3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      //解构出一级分类的id
      const { category1Id } = this.cForm;
      //事件触发时将id传给父组件(参数区分一级二级三级 level标记)
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      //通过一级分类的id获取二级数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      // console.log(result);
      if (result.code == 200) {
        this.List2 = result.data;
      }
    },
    //二级分类的select事件的回调（当一级分类的option发生变化时获取响应二级分类的数据）
    async handler2() {
      // //清除数据（报错）
      this.list3 = [];
      this.cForm.category3Id = "";
      //解构出二级分类的id
      const { category2Id } = this.cForm;
      //事件触发时将二级id传给父组件
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      //通过二级分类的id获取三级数据
      let result = await this.$API.attr.reqCategory3List(category2Id);
      // console.log(result);
      if (result.code == 200) {
        this.List3 = result.data;
      }
    },
    //三级分类的select事件的回调
    handler3() {
      const { category3Id } = this.cForm;
      //事件触发时将三级id传给父组件
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style></style>
