<script setup>
import { ref, watch, computed } from 'vue'
import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const htmlContent = ref('')
const headings = ref([])

// 配置marked
marked.setOptions({
  highlight: function (code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang)
    } else {
      return code
    }
  },
  langPrefix: 'language-'
})

// 解析标题以生成目录树
const parseHeadings = (markdown) => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    
    headings.push({
      id: id,
      title: title,
      level: level,
      children: []
    })
  }

  // 构建层级结构
  const root = { children: [] }
  const stack = [root]

  headings.forEach(heading => {
    const node = { ...heading, children: [] }
    
    // 找到合适的父节点
    while (stack.length > 1 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    
    stack[stack.length - 1].children.push(node)
    stack.push(node)
  })

  return root.children
}

// 监听内容变化并更新HTML和目录
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      htmlContent.value = marked(newContent)
      headings.value = parseHeadings(newContent)
    } else {
      htmlContent.value = ''
      headings.value = []
    }
  },
  { immediate: true }
)

// 跳转到指定标题
const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 计算是否有目录
const hasToc = computed(() => headings.value.length > 0)
</script>

<template>
    <div class="markdown-container" :class="{ 'with-toc': hasToc }">
      <div class="markdown-body" v-html="htmlContent"></div>
      <div v-if="hasToc" class="toc-container">
        <h3 class="toc-title">文章目录</h3>
        <ul class="toc-tree level-0">
          <li 
            v-for="item in headings" 
            :key="item.id" 
            class="toc-item"
          >
            <a 
              href="#" 
              class="toc-link" 
              @click.prevent="scrollToHeading(item.id)" 
              :data-id="item.id"
            >
              {{ item.title }}
            </a>
            <ul v-if="item.children && item.children.length" class="toc-tree level-1">
              <li 
                v-for="child1 in item.children" 
                :key="child1.id" 
                class="toc-item"
              >
                <a 
                  href="#" 
                  class="toc-link" 
                  @click.prevent="scrollToHeading(child1.id)" 
                  :data-id="child1.id"
                >
                  {{ child1.title }}
                </a>
                <ul v-if="child1.children && child1.children.length" class="toc-tree level-2">
                  <li 
                    v-for="child2 in child1.children" 
                    :key="child2.id" 
                    class="toc-item"
                  >
                    <a 
                      href="#" 
                      class="toc-link" 
                      @click.prevent="scrollToHeading(child2.id)" 
                      :data-id="child2.id"
                    >
                      {{ child2.title }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped>

.markdown-container {
  flex: 1;
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.markdown-container.with-toc {
  max-width: calc(100% - 250px);
}

.toc-container {
  width: 250px;
  padding: 20px;
  border-left: 1px solid #eee;
  background-color: #f8f9fa;
  position: fixed;
  top: 64px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.toc-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.toc-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-tree.level-0 {
  padding-left: 0;
}

.toc-tree.level-1 {
  padding-left: 16px;
}

.toc-tree.level-2 {
  padding-left: 32px;
}

.toc-tree.level-3 {
  padding-left: 48px;
}

.toc-tree.level-4 {
  padding-left: 64px;
}

.toc-tree.level-5 {
  padding-left: 80px;
}

.toc-item {
  margin: 6px 0;
  line-height: 1.4;
}

.toc-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  display: block;
  padding: 4px 0;
  transition: all 0.2s;
}

.toc-link:hover {
  color: #42b883;
}

.toc-link[data-id] {
  color: #333;
}

.markdown-body {
  max-width: calc(100% - 300px);
  margin: 10px 20px;
  padding-right: 20px; /* 为右侧目录留出空间 */
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  scroll-margin-top: 80px; /* 确保标题不会被导航栏遮挡 */
}

.markdown-body :deep(h1) {
  font-size: 2em;
  margin: 0.67em 0;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-body :deep(h2) {
  font-size: 1.5em;
  margin: 0.83em 0;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-body :deep(h3) {
  font-size: 1.25em;
  margin: 1em 0;
}

.markdown-body :deep(p) {
  margin: 1em 0;
  line-height: 1.6;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 2em;
  margin: 1em 0;
}

.markdown-body :deep(li) {
  margin: 0.5em 0;
}

.markdown-body :deep(a) {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(code) {
  background-color: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
}

.markdown-body :deep(pre) {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-body :deep(blockquote) {
  margin: 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-body :deep(th) {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-body :deep(img) {
  max-width: 100%;
  box-sizing: content-box;
}
</style>