import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')

Vue.filter('date-time', time => {
  if (time) {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return ''
  }
})