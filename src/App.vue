<script setup>
import { ref } from 'vue'
import Main from './main/Main.vue'
import Menu from './menu/Menu.vue'
import Navigation from './navigation/Navigation.vue'
import MarkdownView from './components/MarkdownView.vue'

// 模拟一些Markdown文档内容
const markdownContents = {
  '/frontend/vue/intro': `# Vue.js 入门指南

## 什么是 Vue.js？

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

## 核心特性

### 1. 响应式数据绑定

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

\`\`\`javascript
// HTML 模板
<div id="app">
  {{ message }}
</div>

// JavaScript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
\`\`\`

### 2. 组件系统

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。

\`\`\`javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
\`\`\`

## 开始使用

安装 Vue.js 非常简单，可以通过以下几种方式：

1. CDN 引入
2. npm 安装
3. Vue CLI 脚手架`,

  '/frontend/react/basic': `# React 基础知识

## React 简介

React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发并开源，现在由 Facebook 和社区维护。

## 核心概念

### 1. JSX

JSX 是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

### 2. 组件

React 组件通过一个名为 render() 的方法，接收任意的输入值（称之为"props"），并返回需要展示的元素。

\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

### 3. State

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

\`\`\`jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
\`\`\``,

  '/frontend/js/advanced': `# JavaScript 进阶

## 闭包

闭包是指有权访问另一个函数作用域中变量的函数。

\`\`\`javascript
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer Variable: ' + outerVariable);
    console.log('Inner Variable: ' + innerVariable);
  }
}

const newFunction = outerFunction('outside');
newFunction('inside'); // Outer Variable: outside
                      // Inner Variable: inside
\`\`\`

## Promise

Promise 对象用于表示一个异步操作的最终完成 (或失败) 及其结果值。

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve('操作成功完成!');
  } else {
    reject('操作失败!');
  }
});

promise
  .then(result => {
    console.log(result); // 操作成功完成!
  })
  .catch(error => {
    console.log(error);
  });
\`\`\``,

  '/frontend/framework/vue': `# Vue 框架详解

## Vue 简介

Vue 是一套用于构建用户界面的渐进式框架。

## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性

## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性
## 特性

## 特性
## 特性
## 特性

1. **轻量级** - Vue 的 API 设计非常简洁，学习曲线平缓
2. **高性能** - 虚拟 DOM 和合理的更新策略
3. **生态系统丰富** - Vue Router、Vuex、Vue CLI 等官方工具`,
  
  '/frontend/framework/react': `# React 框架详解

## React 简介

React 是 Facebook 推出的一个用于构建用户界面的 JavaScript 库。

## 特性

1. **组件化** - 构建可复用的 UI 组件
2. **虚拟 DOM** - 提高渲染性能
3. **单向数据流** - 数据流清晰易懂`,
  
  '/frontend/framework/angular': `# Angular 框架详解

## Angular 简介

Angular 是 Google 推出的一个基于 TypeScript 的开源 Web 应用框架。

## 特性

1. **完整的框架** - 提供了构建应用所需的一切
2. **TypeScript 支持** - 默认使用 TypeScript
3. **依赖注入** - 强大的依赖注入系统`,
  
  '/backend/node/practice': `# Node.js 实战

## Node.js 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

## 应用场景

1. **Web 服务器** - 构建高性能的 Web 服务器
2. **实时应用** - 聊天应用、在线游戏等
3. **命令行工具** - 构建各种命令行工具`,
  
  '/backend/database/design': `# 数据库设计

## 设计原则

1. **范式化** - 减少数据冗余
2. **反范式化** - 提高性能
3. **索引优化** - 提高查询效率`,

  '/backend/java/spring': `# Spring 框架

## Spring 简介

Spring 是一个开源的 Java 平台，提供了全面的基础设施支持。

## 核心特性

1. **依赖注入** - 松耦合设计
2. **面向切面编程** - 横切关注点的分离
3. **事务管理** - 声明式事务`,
  
  '/backend/java/mybatis': `# MyBatis 框架

## MyBatis 简介

MyBatis 是一个优秀的持久层框架，支持定制化 SQL、存储过程以及高级映射。

## 特性

1. **SQL 映射** - 简化 JDBC 操作
2. **动态 SQL** - 灵活的 SQL 构造
3. **缓存机制** - 一级缓存和二级缓存`,
  
  '/devops/docker/container': `# Docker 容器化

## Docker 简介

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中。

## 核心概念

1. **镜像** - 只读模板
2. **容器** - 镜像的运行实例
3. **仓库** - 集中存放镜像文件的场所`,
  
  '/devops/nginx/config': `# Nginx 配置

## Nginx 简介

Nginx 是一个高性能的 HTTP 和反向代理 web 服务器。

## 常用配置

1. **静态文件服务** - 快速提供静态资源
2. **反向代理** - 负载均衡和高可用
3. **SSL 终止** - HTTPS 支持`
}

const selectedContent = ref('')
const showMarkdown = ref(false)

const handleSelectLeaf = (data) => {
  // 获取对应的Markdown内容
  if (markdownContents[data.path]) {
    selectedContent.value = markdownContents[data.path]
    showMarkdown.value = true
  } else {
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
  </div>
  <div v-if="showMarkdown" class="markdown-wrapper">
    <div class="markdown-content">
      <MarkdownView :content="selectedContent"/>
    </div>
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
  overflow: auto;
  padding: 20px;
}
</style>