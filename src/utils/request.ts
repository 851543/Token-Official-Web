import axios from 'axios'

/**
 * 创建axios实例
 */
export const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_BASE || '', // 获取环境变量VITE_BASE的值作为baseURL
  timeout: 5000 //超时的时间
})

export const requestLocal = axios.create({
  //基础路径
  baseURL: '', 
  timeout: 5000 //超时的时间
})
