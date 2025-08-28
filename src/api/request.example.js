/**
 * 请求工具使用示例
 */

import request from 'request';

// 定义请求参数和响应数据的示例结构
const requestData = {
  username: 'example',
  password: 'password123'
};

const responseData = {
  success: false,
  message: '',
  data: {}
};

// 使用示例
async function loginExample() {
  try {
    const result = await request.post('/api/login', requestData, responseData);
    console.log('Login result:', result);
    return result;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export default {
  loginExample
};