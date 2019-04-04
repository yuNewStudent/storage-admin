<template>
  <div class="goodscounting">
    <div class="goodscounting_operation">
      <div class="goodscounting_operationl">
        <div class="block">
          <span class="demonstration">仓库选择:</span>
          <el-select v-model="value" placeholder="请输入货物名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div style="clear: both;"></div>
        <div class="goodscounting_query">
          <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="goodscounting_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="goodscounting_list">
      <el-table size='mini' :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="address" label="物品名称"></el-table-column>
        <el-table-column prop="address" label="库存数量"></el-table-column>
        <el-table-column prop="address" label="库存预警"></el-table-column>
        <el-table-column prop="address" label="购入时间"></el-table-column>
        <el-table-column prop="address" label="有效保质期"></el-table-column>
        <el-table-column prop="address" label="上次入库时间"></el-table-column>
        <el-table-column prop="address" label="规格型号"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="所在仓库"></el-table-column>
        <el-table-column prop="address" label="保管人"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
      </el-table>
    </div>
    <!-- <div class="goodscounting_list" v-else>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="商品类别">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="申请采购数量">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="单位">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="address" label="所在仓库">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>
        <el-table-column prop="address" label="经办人">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="用途">
          <el-input></el-input>
        </el-table-column>
        <el-table-column prop="address" label="备注">
          <el-input></el-input>
        </el-table-column>
      </el-table>
    </div> -->
    <div class="goodscounting_operation">
      <p>
        操作人:
        <span>黎先生</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input10: "",
      tableData: [
        {
          date: "哈哈哈",
          name: "王小虎",
          address: "1518 弄"
        },
        {
          date: "话啊哈哈哈",
          name: "王小虎",
          address: "1517 弄"
        },
        {
          date: "话啊哈哈哈",
          name: "王小虎",
          address: "1519 弄"
        },
        {
          date: "话啊哈哈哈",
          name: "王小虎",
          address: "1516 弄"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      options: [
        {
          value: "选项1",
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        },
        {
          value: "选项4",
          label: "D区"
        },
        {
          value: "选项5",
          label: "F区"
        }
      ],
      value: "",
      value1: ""
    };
  },
  components: {},
  methods: {
    buttonModifythe: function() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(this.show);
    },
    onSubmit() {
      console.log("submit!");
    },
    buttonsave: function() {},
    buttonaudit: function() {}
  }
};
</script>
<style>
.goodscounting {
  padding: 20px 20px;
}
.goodscounting_unitl {
  float: left;
}
.goodscounting_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.goodscounting_unitr p {
  color: #777777;
}
.goodscounting_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.goodscounting_operationl {
  float: left;
  display: flex;
}
.goodscounting_operationr {
  float: right;
}
.goodscounting_list {
  margin-top: 20px;
}
.goodscounting_query {
  display: flex;
  margin-left: 10px;
}
.goodscounting_query input {
  width: 150px;
}
.goodscounting_query button {
  margin-left: 10px;
}
</style>