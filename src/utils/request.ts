import axios from 'axios'

/**
 * 创建axios实例
 */
const request = axios.create({
  //基础路径
  baseURL: '/', // 使用相对路径，让 Nginx 处理代理
  timeout: 5000 //超时的时间
})

export default request
