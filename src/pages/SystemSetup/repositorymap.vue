<template>
  <div class="repositorymap">
    <div class="repositorymap_h">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="楼下仓库地图" name="first">
          <canvas
            width="700"
            height="400"
            ref="cvs"
            style="display: block; margin:50px auto;border: 1px solid #ddd;"
          ></canvas>
        </el-tab-pane>
        <el-tab-pane label="楼上仓库地图" name="second">
          <canvas
            width="700"
            height="400"
            ref="cvss"
            style="display: block; margin:50px auto;border: 1px solid #ddd;"
          ></canvas>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CanvasZoom from "../../../static/js/canvas_zoom";
export default {
  data() {
    return {
      activeName2: "first",
      isshow:false,
      rooms: {
        id: 3,
        layout: "0 0,880 0,880 400,0 400",
        name: "",
       subrooms: [
          {
            layout: "860 150,880 150,880 190,860 190",
            center_position: "30 350",
            id: 10,
            name: "门"
          },
          {
            layout: "150 240,180 240,180 180,150 180",
            center_position: "100 350",
            id: 11,
            name: "墙"
          },
          {
            layout: "150 400,180 400,180 300,150 300",
            center_position: "100 350",
            id: 11,
            name: "墙"
          },
           {
            layout: "200 320,260 320,260 180,200 180",
            center_position: "180 345,",
            id: 12,
            name: "柜子"
          },
          {
            layout: "260 390,460 390,460 320,260 320",
            center_position: "180 345,",
            id: 12,
            name: "柜子"
          },
          {
            layout: "490 390,520 390,520 320,490 320",
            center_position: "260 345",
            id: 13,
            name: "插座"
          },
           {
            layout: "310 290,360 290,360 180,310 180",
            center_position: "260 345",
            id: 22,
            name: "柜子"
          },
          {
            layout: "540 320,650 320,650 390,540 390",
            center_position: "360 345",
            id: 14,
            name: "电箱"
          },
           {
            layout: "670 300,880 300,880 400,670 400",
            center_position: "360 345",
            id: 14,
            name: "墙"
          },
            {
            layout: "860 200,880 200,880 300,860 300",
            center_position: "360 345",
            id: 14,
            name: "墙"
          },
            {
            layout: "790 200,840 200,840 300,790 300",
            center_position: "360 345",
            id: 14,
            name: "柜子"
          },
          {
            layout: "400 290,450 290,450 180,400 180",
            center_position: "370 260",
            id: 15,
            name: "柜子"
          },
          {
            layout: "150 0,180 0,180 80,150 80",
            center_position: "460 45",
            id: 19,
            name: "墙"
          },
           {
            layout: "30 0,120 0,120 30,30 30",
            center_position: "460 45",
            id: 19,
            name: "门"
          },
          {
            layout: "190 0,780 0,780 60,190 60",
            center_position: "460 45",
            id: 19,
            name: "音响"
          },
       ]
      },
      room: {
        id: 3,
        layout: "0 0,880 0,880 400,0 400",
        name: "",
        subrooms: [
          {
            layout: "0 390,70 390,70 260,0 260",
            center_position: "30 350",
            id: 10,
            name: "后勤保障装备"
          },
           {
            layout: "0 400,320 400,320 390,0 390",
            center_position: "30 350",
            id: 10,
            name: "墙"
          },
          {
            layout: "860 150,880 150,880 190,860 190",
            center_position: "30 350",
            id: 10,
            name: "门"
          },
          {
            layout: "145 290,270 290,270 180,145 180",
            center_position: "100 350",
            id: 11,
            name: "消杀药品"
          },
          {
            layout: "145 390,270 390,270 300,145 300",
            center_position: "100 350",
            id: 11,
            name: "消杀器械"
          },
           {
            layout: "320 290,460 290,460 180,320 180",
            center_position: "180 345",
            id: 12,
            name: "医疗急救装备"
          },
          {
            layout: "320 400,460 400,460 300,320 300",
            center_position: "180 345,",
            id: 12,
            name: "医疗急救装备"
          },
          {
            layout: "500 400,630 400,630 300,500 300",
            center_position: "260 345",
            id: 13,
            name: "个人防护"
          },
           {
            layout: "500 290,630 290,630 180,500 180",
            center_position: "260 345",
            id: 22,
            name: "个人防护"
          },
          {
            layout: "670 300,810 300,810 400,670 400",
            center_position: "360 345",
            id: 14,
            name: "中毒抢救药品"
          },
          {
            layout: "670 290,810 290,810 180,670 180",
            center_position: "370 260",
            id: 15,
            name: "常被疫苗和血清"
          },
          {
            layout: "190 0,300 0,300 60,190 60",
            center_position: "460 45",
            id: 19,
            name: "医用器材"
          },
          {
            layout: "310 0,430 0,430 60,310 60",
            center_position: "460 45",
            id: 25,
            name: "现场检测试剂"
          },
           {
            layout: "440 0,520 0,520 20,440 20",
            center_position: "460 45",
            id: 26,
            name: ""
          },
          {
            layout: "530 0,640 0,640 60,530 60",
            center_position: "460 45",
            id: 27,
            name: "普通抢救药"
          },
          {
            layout: "650 0,830 0,830 60,650 60",
            center_position: "460 45",
            id: 27,
            name: "核辐射传染病抢救药"
          },
          {
            layout: "70 0,180 0,180 60,70 60",
            center_position: "260 45",
            id: 20,
            name: "医用器材"
          },  
          {
            layout: "0 0,70 0,70 120,0 120",
            center_position: "60 70,",
            id: 21,
            name: "采样及检测设备"
          },
          {
            layout: "0 125,70 125,70 250,0 250",
            center_position: "45 160",
            id: 22,
            name: "后勤保障装备"
          },
        ]
      }
    };
  },
  components: {},
  created(){
    this.updates();
  },
  mounted () {
      this.$nextTick(() => {
        this.updates();
      });
  },
  methods: {
    handleClick(tab, event) {
      if(this.isshow!=false){
        this.isshow=false;
        this.updates();
      }else{
        this.isshow=true;
        this.upstairs();
      }
    },
    changeColor() {
      var colors = [
        "rgba(76, 181, 216, 0.2)",
        "rgba(225, 215, 155, 0.1)",
        "rgba(230, 110, 250, 0.2)",
        "rgba(76, 181, 216, 0.2)"
      ];
      var random = this.getRandom(0, colors.length - 1);
      return colors[random];
    },
    getRandom(n, m) {
      var n = Number(n); //强制转换成数字
      var m = Number(m);
      if (isNaN(n) || isNaN(m)) {
        //判断是否为有效数字 ，其中一个不是有效数字就返回[0,1)之间的随机小数
        return math.random();
      }
      if (n > m) {
        //如果n>m则交换
        var temp = n;
        n = m;
        m = temp;
      }
      return Math.round(Math.random() * (m - n) + n);
    },
    changeData(a) {
      var b = a.split(",");
      String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
      };
      var c = b.filter(v => {
        return !!v;
      });
      var d = c.map(v => {
        return {
          x: v.Trim().split(" ")[0],
          y: v.Trim().split(" ")[1]
        };
      });
      console.log(d)
      return d
    },
    ///楼上
    upstairs () {
      let canva = this.$refs.cvss
      var index = this.rooms.layout
      var subrooms = this.rooms.subrooms
      let tangram = {}
      tangram.room = {}
      tangram.room.p = this.changeData(index)
      tangram.room.color = this.changeColor()
      tangram.room.bordercolor = this.changeColor()
      tangram.room.title = this.room.name
      tangram.module = []
      tangram.module = subrooms.map(v => {
        return {
          p: this.changeData(v.layout),
          title: v.name,
          color: this.changeColor(),
          bordercolor: this.changeColor()
        }
      })
      this.canvasZoom = new CanvasZoom({
        canvas: canva,
        mapInfo: tangram,
        isFullPage: false,
        ratio: {
          x: 8.8,
          y: 4.3
        }
      });
    },
    //楼下仓库
    updates () {
      let canvas = this.$refs.cvs
      var index = this.room.layout
      var subrooms = this.room.subrooms
      let tangram = {};
      tangram.room = {}
      tangram.room.p = this.changeData(index)
      tangram.room.color = this.changeColor()
      tangram.room.bordercolor = this.changeColor()
      tangram.room.title = this.room.name;
      tangram.module = []
      tangram.module = subrooms.map(v => {
        return {
          p: this.changeData(v.layout),
          title: v.name,
          color: this.changeColor(),
          bordercolor: this.changeColor()
        }
      })
      this.canvasZoom = new CanvasZoom({
        canvas: canvas,
        mapInfo: tangram,
        isFullPage: false,
        ratio: {
          x: 8.8,
          y: 4.3
        }
      })
    }
  }
};
</script>
<style>
.repositorymap {
  padding: 40px 40px;
}
.repositorymap_h {
  width: 1000px;
  margin: 0 auto;
}
.repositorymap_h .el-tabs__nav-scroll {
    overflow: hidden;
    margin: 0 auto;
    width: 250px;
}
.is-active {
  background-color: #4499f2;
  color: #ffffff !important;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 0px solid #e4e7ed !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  background-color: #ffffff;
  /* border-bottom: none; */
  border-radius: 4px 4px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
