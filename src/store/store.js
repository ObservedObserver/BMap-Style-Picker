import Vue from 'vue'
import Vuex from 'vuex'
// import initColor from './initColor.json'
import jsonStyle from './jsonStyle2.json'
import scatters from './scatters.json'
import 'whatwg-fetch'
var HOST = 'http://0.0.0.0:5000'
Vue.use(Vuex)
// {
//   var colorList = []
//   let _length = jsonStyle.length
//   for (let i = 0; i < _length; i++) {
//     let color = {
//       hex: jsonStyle[i].stylers.color
//       // hsl: {
//       //   h: 150,
//       //   s: 0.5,
//       //   l: 0.2,
//       //   a: 1
//       // },
//       // hsv: {
//       //   h: 150,
//       //   s: 0.66,
//       //   v: 0.30,
//       //   a: 1
//       // },
//       // rgba: {
//       //   r: 25,
//       //   g: 77,
//       //   b: 51,
//       //   a: 1
//       // },
//       // a: 1
//     }
//     colorList.push(color)
//   }
// }
// 虽然可以从后端获取配色方案，但仍建议在前端保留一分配色方案模版用作创建新的配色方案时使用。
var store = new Vuex.Store({
  state: {
    optionList: [],
    currentOption: 0,
    // colorList: colorList,
    // colorList 用来存储多种不同的颜色方案
    colorList: [],
    bmapOption: {
      bmap: {
        center: [116.3, 39.9],
        // 中心位置坐标
        zoom: 7,
        // 地图缩放比例
        roam: true,
        // 开启用户缩放
        mapStyle: {
          // 百度地图自定义样式
          styleJson: jsonStyle
        }
      },
      visualMap: {
        // 视觉映射组件
        type: 'continuous',
        min: 0,
        max: 100,
        calculable: true,
        inRange: {
          color: ['#32c2cb', '#ebde36', '#f13d51'],
          symbolSize: [10, 40]
        },
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '指数',
          type: 'scatter',
          coordinateSystem: 'bmap',
          symbolSize (val) {
            return (val[2] * 0.3) + 10
          },
          data: scatters
          // 坐标系使用bmap
          // data: this.$store.state.geoData
        }
      ]
    }
  },
  getters: {
    styleJson (state) {
      return state.bmapOption.bmap.mapStyle.styleJson
    },
    options (state) {
      return state.optionList
    }
  },
  mutations: {
    changeColor (state, paras) {
      // paras = [index, color]
      // changeColor是颜色选取器在选取颜色时调用，将选取的颜色替代吊bmap配置中的颜色，实现对地图的实时修改
      console.log(paras)
      state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.color = paras[1]
    },
    changeVisible (state, paras) {
      // paras = [index, status]
      // changeVisible是在选择某一元素（如铁路）是否可见时调用，将修改bmap中对应元素属性的visibility
      if (paras[1]) {
        state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.visibility = 'on'
      } else {
        state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.visibility = 'off'
      }
    },
    changeOption (state, index) {
      // changeOption用来从optionList中选取当前的option方案，并将其显示在地图上
      // 这个过程还会需要建立一个colorList以方便colorPicker进行调用
      state.currentOption = index
      state.bmapOption.bmap.mapStyle.styleJson = state.optionList[index].option
      state.colorList = []
      let _length = state.bmapOption.bmap.mapStyle.styleJson.length
      for (let i = 0; i < _length; i++) {
        let color = {hex: state.bmapOption.bmap.mapStyle.styleJson[i].stylers.color}
        state.colorList.push(color)
      }
    },
    createOption (state) {
      state.optionList.push({
        name: `demo${state.optionList.length}`,
        date: (new Date()).toString(),
        option: JSON.parse(JSON.stringify(jsonStyle))
      })
      // state.currentOption
      // 可以加如自动跳转功能
    }
  },
  actions: {
    getOptions (context) {
      // 从服务器获取所有已有的配色方案
      fetch(HOST + '/api/options', {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((res) => {
        // 更新配色方案列表，同时更新当前被选取的配色方案为获取到的列表中的第一个方案
        console.log(res)
        context.state.optionList = res
        context.state.currentOption = 0
        context.state.bmapOption.bmap.mapStyle.styleJson = res[0].option
        // 性质：
        // context.state.optionList与context.state.bmapOption.bmap.mapStyle.styleJson由于引用关系具有同步关系
        // 同步colorList与bmapStyle
        context.state.colorList = []
        let _length = res[0].option.length
        for (let i = 0; i < _length; i++) {
          let color = {hex: res[0].option[i].stylers.color}
          context.state.colorList.push(color)
        }
      })
    },
    updateOptions (context) {
      // 创建一个配色方案，发送至后端进行保存，同时返回新的配色方案列表，并重新渲染前端
      // 另一种实现方案即不获取完整的返回数据，保存在前端的缓存数据中（认为前后端在逻辑上是同步一致的，不需要确认过程，这种方案思想优美，但不够安全稳定）
      fetch(HOST + '/api/update', {
        method: 'POST',
        body: JSON.stringify(context.state.optionList)
      }).then((response) => {
        return response.json()
      }).then((response) => {
        context.state.optionList = response
        context.state.currentOption = 0
        context.state.bmapOption.bmap.mapStyle.styleJson = response[0].option
        context.state.colorList = []
        let _length = response[0].option.length
        for (let i = 0; i < _length; i++) {
          let color = {hex: response[0].option[i].stylers.color}
          context.state.colorList.push(color)
        }
      })
    }
  }
})

export {store}
