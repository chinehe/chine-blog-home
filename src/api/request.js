
const baseUrl = 'http://localhost:8000';

/**
 * 通用HTTP请求工具
 * 支持发送POST请求到后端并处理JSON数据
 */

/**
 * 发送POST请求到指定URL
 * @param {string} url - 请求的URL路径（相对于后端根地址）
 * @param {Object} requestData - 请求参数对象
 * @param {Object} responseData - 请求应答对象（用于类型提示）
 * @returns {Promise<Object>} 返回解析后的应答对象
 */
async function post(url, requestData) {
  const fullUrl = baseUrl + (url.startsWith('/') ? url : '/' + url);
  
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

// GET请求
async function get(url,params){ 
  // url组装
  if (url.startsWith('/')){
    url = baseUrl + url
  }else{
    url = baseUrl + "/" + url
  }

  // 创建查询参数字符串
  if (params){
    const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
    url+="?"+queryString;
  }

  // 发送GET请求
  try {
    // 发送GET请求
    const response = await fetch(url, {
      method: 'GET',
    });

    // 应答码
    if (response.status !== 200) {
      console.error('Invaild status code:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析应答数据
    const result = await response.json();
    return result;

  }catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

export {
  post,
  get
}