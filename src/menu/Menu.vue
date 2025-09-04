<script setup>
import { ref, watch, onMounted } from 'vue'
import { ElTree } from 'element-plus'
import {get} from '../api/request'

const menuItems = ref([])

// 定义事件发射器
const emit = defineEmits(['select-leaf'])

// 从后端获取菜单数据
const fetchMenuData = async () => {
  try {
    // 发送请求
    const result = await get('article/tree', {})
    
    // 应答处理
    if (result.code != "S0000") {
       alert('system error,please try again later')
       return
    }

    // 赋值给菜单数据
    menuItems.value = result.data

  } catch (error) {
    console.error('Failed to fetch menu data:', error)
    alert('system error,please try again later')
  }
}

const handleNodeClick = (data, node) => {
  // 检查节点是否有子节点，如果没有则认为是叶子节点
  if (!data.children) {
    // 发送选中叶子节点的事件
    emit('select-leaf', data)
  }
}

// 组件挂载时获取菜单数据
onMounted(() => {
  fetchMenuData()
})
</script>

<template>
  <div class="menu">
    <div class="menu-header">
      <h3>文章分类</h3>
    </div>
    <div class="menu-content">
      <el-tree
        :data="menuItems"
        node-key="path"
        :props="{ children: 'children', label: 'title' }"
        @node-click="handleNodeClick"
        :expand-on-click-node="true"
        :default-expand-all="true"
      />
    </div>
  </div>
</template>

<style scoped>
.menu {
  top: 64px;
  left: 0;
  bottom: 0;
  width: 260px;
  border-right: 1px solid rgba(60, 60, 60, 0.12);
  overflow-y: scroll;
  overflow-x: visible;
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