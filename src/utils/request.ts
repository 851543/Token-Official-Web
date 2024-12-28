import axios from 'axios'

/**
 * 创建axios实例
 */
const request = axios.create({
  //基础路径
  baseURL: 'http://localhost:85/', // VITE基础路径
  timeout: 5000 //超时的时间
})

export default request
