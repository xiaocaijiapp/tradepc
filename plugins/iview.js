import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import {
  Form,
  FormItem,
  Input,
  Progress,
  Carousel,
  CarouselItem,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Page,
  InputNumber,
  RadioGroup,
  Radio,
  Row,
  Col,
  Upload,
  Tabs,
  TabPane,
  Modal,
  Poptip
} from 'view-design'
import * as filters from '~/assets/tools/filters'
const components = {
  Form,
  FormItem,
  Input,
  Progress,
  Carousel,
  CarouselItem,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Page,
  InputNumber,
  RadioGroup,
  Radio,
  Row,
  Col,
  Upload,
  Tabs,
  TabPane,
  Modal,
  Poptip
}
const IviewModule = {
  ...components
}
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  attempt: 1,
  loading: require('@/assets/images/index/goods.png'),
  error: require('@/assets/images/index/goods.png')
})
Vue.prototype.$Message = Message
// 循环注册全局组件
Object.keys(IviewModule).forEach((key) => {
  Vue.component(key, IviewModule[key])
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
