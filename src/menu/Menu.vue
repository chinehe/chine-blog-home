<script setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

const menuItems = ref([
  {
    id: 1,
    name: '前端开发',
    children: [
      { id: 11, name: 'Vue.js 入门', path: '/frontend/vue/intro' },
      { id: 12, name: 'React 基础', path: '/frontend/react/basic' },
      { id: 13, name: 'JavaScript 进阶', path: '/frontend/js/advanced' },
      {
        id: 14,
        name: '框架',
        children: [
          { id: 141, name: 'Vue.js', path: '/frontend/framework/vue' },
          { id: 142, name: 'React', path: '/frontend/framework/react' },
          { id: 143, name: 'Angular', path: '/frontend/framework/angular' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '后端开发',
    children: [
      { id: 21, name: 'Node.js 实战', path: '/backend/node/practice' },
      { id: 22, name: '数据库设计', path: '/backend/database/design' },
      {
        id: 23,
        name: 'Java',
        children: [
          { id: 231, name: 'Spring', path: '/backend/java/spring' },
          { id: 232, name: 'MyBatis', path: '/backend/java/mybatis' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '运维部署',
    children: [
      { id: 31, name: 'Docker 容器化', path: '/devops/docker/container' },
      { id: 32, name: 'Nginx 配置', path: '/devops/nginx/config' }
    ]
  }
])

// 定义事件发射器
const emit = defineEmits(['select-leaf'])

const handleNodeClick = (data, node) => {
  // 检查节点是否有子节点，如果没有则认为是叶子节点
  if (!data.children) {
    // 发送选中叶子节点的事件
    emit('select-leaf', data)
  }
}
</script>

<template>
  <div class="menu">
    <div class="menu-header">
      <h3>文章分类</h3>
    </div>
    <div class="menu-content">
      <el-tree
        :data="menuItems"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @node-click="handleNodeClick"
        :expand-on-click-node="true"
        :default-expand-all="true"
      />
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  width: 260px;
  border-right: 1px solid rgba(60, 60, 60, 0.12);
  overflow-y: auto;
  padding-top: 20px;
  z-index: 99;
}

.menu-header {
  padding: 0 20px 16px;
}

.menu-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.menu-content {
  padding: 16px 20px;
}

:deep(.el-tree) {
  background: transparent;
  color: #333;
}

:deep(.el-tree-node__content) {
  height: 36px;
  border-radius: 4px;
  margin-bottom: 2px;
}

:deep(.el-tree-node__content:hover) {
  background-color: #e5e5e5;
  color: #42b883;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: #e5f5ee;
  color: #42b883;
  font-weight: 500;
}

:deep(.el-tree-node:focus > .el-tree-node__content) {
  background-color: #e5f5ee;
  color: #42b883;
}
</style>