<script setup>
import { ref } from 'vue'
import Main from './main/Main.vue'
import Menu from './menu/Menu.vue'
import Navigation from './navigation/Navigation.vue'
import MarkdownView from './components/MarkdownView.vue'
import {get} from './api/request'

const selectedContent = ref('')
const showMarkdown = ref(false)

// 从后端获取菜单数据
const fetchArticleData = async (path) => {
  try {
    // 发送请求获取Markdown内容
    const result =  await get('article/content', {
      path: path
    })

    // 应答处理
    if (result.code != "S0000") {
      console.error('fetch article data failed. code:' + result.code + ' message:' + result.message);
      alert('system error,please try again later')
      return
    }

    return result.data
  } catch (error) {
    console.error('Failed to fetch article data:', error)
    alert('system error,please try again later')
  }
}

const handleSelectLeaf = async (data) => {
  // 获取对应的Markdown内容
  const content =await fetchArticleData(data.path);
  if (content){
    selectedContent.value = content
    showMarkdown.value = true
  }else{
    // 如果没有找到对应内容，显示默认信息
    selectedContent.value = `# ${data.name}\n\n该文档内容尚未准备完成，敬请期待。`
    showMarkdown.value = true
  }
}
</script>

<template>
  <Navigation/>
  <div class="app-container">
    <Menu @select-leaf="handleSelectLeaf"/>
    <Main :show="!showMarkdown"/>
    <MarkdownView :content="selectedContent" v-if="showMarkdown" />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  overflow: hidden;
}

#app {
  min-height: 100vh;
}

.app-container {
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
}

.markdown-wrapper {
  position: fixed;
  top: 64px;
  left: 260px; /* 菜单宽度 */
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: white;
}

.markdown-content {
  flex: 1;
  overflow: hidden;
  padding: 20px;
}
</style>