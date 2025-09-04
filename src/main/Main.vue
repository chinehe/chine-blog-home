<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})

const article = ref({
  title: '欢迎来到我的博客',
  date: '2025-04-05',
  author: '博主',
  content: `
    <p>这是一个使用Vue 3和Vite构建的博客网站。</p>
    
    <h2>关于本博客</h2>
    <p>本博客主要用于分享前端开发、后端技术和运维部署等方面的知识和经验。</p>
    
    <h2>技术栈</h2>
    <ul>
      <li>Vue 3</li>
      <li>Vite</li>
      <li>JavaScript/TypeScript</li>
    </ul>
    
    <h2>功能特点</h2>
    <p>博客具有以下功能特点：</p>
    <ol>
      <li>响应式设计，适配不同设备屏幕</li>
      <li>清晰的导航结构</li>
      <li>分类文章浏览</li>
      <li>简洁美观的界面</li>
    </ol>
    
    <h2>结语</h2>
    <p>希望这个博客能为你提供有价值的技术内容。如果你有任何问题或建议，欢迎留言交流！</p>
  `
})
</script>

<template>
  <main class="main-content" v-show="show">
    <div class="article-container">
      <article class="article">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span class="article-author">作者: {{ article.author }}</span>
          </div>
        </header>
        <div class="article-content" v-html="article.content"></div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - 64px);
  padding: 32px;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
}

.article-container {
  margin: 0 auto;
}

.article {
  padding: 32px 0;
}

.article-header {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #333;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.article-content {
  font-size: 16px;
  line-height: 1.7;
  color: #333;
}

.article-content h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: #333;
}

.article-content p {
  margin: 16px 0;
}

.article-content ul,
.article-content ol {
  margin: 16px 0;
  padding-left: 24px;
}

.article-content li {
  margin: 8px 0;
}

.article-content a {
  color: #42b883;
  text-decoration: none;
}

.article-content a:hover {
  text-decoration: underline;
}
</style>