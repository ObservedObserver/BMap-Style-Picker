import Vue from 'vue'
import Vuex from 'vuex'
// import initColor from './initColor.json'
import jsonStyle from './jsonStyle2.json'
import scatters from './scatters.json'
Vue.use(Vuex)
{
  var colorList = []
  let _length = jsonStyle.length
  for (let i = 0; i < _length; i++) {
    let color = {
      hex: jsonStyle[i].stylers.color
      // hsl: {
      //   h: 150,
      //   s: 0.5,
      //   l: 0.2,
      //   a: 1
      // },
      // hsv: {
      //   h: 150,
      //   s: 0.66,
      //   v: 0.30,
      //   a: 1
      // },
      // rgba: {
      //   r: 25,
      //   g: 77,
      //   b: 51,
      //   a: 1
      // },
      // a: 1
    }
    colorList.push(color)
  }
}
var store = new Vuex.Store({
  state: {
    colorList: colorList,
    currentColorPos: 0,
    bmapOption: {
      bmap: {
        center: [116.3, 39.9],
        // 中心位置坐标
        zoom: 9,
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
    currentColor (state) {
      return state.colorList[state.currentColorPos]
    },
    currentTitle (state) {
      return state.bmapOption.bmap.mapStyle.styleJson[state.currentColorPos].featureType + ' | ' + state.bmapOption.bmap.mapStyle.styleJson[state.currentColorPos].elementType
    }
  },
  mutations: {
    changeColor (state, paras) {
      // paras = [index, color]
      console.log(paras)
      state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.color = paras[1]
    },
    changeVisible (state, paras) {
      // paras = [index, status]
      if (paras[1]) {
        state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.visibility = 'on'
      } else {
        state.bmapOption.bmap.mapStyle.styleJson[paras[0]].stylers.visibility = 'off'
      }
    }
  }
})

export {store}
