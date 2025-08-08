<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'ChineHe',
  avatar: 'https://avatars.githubusercontent.com/u/62579721?v=4'
})
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
        <div class="nav-logo">
            <div class="logo">
                <span class="logo-text">ChineHe的博客</span>
            </div>
        </div>
        <div class="nav-items">
            <ul class="nav-links">
            <li><a href="#" class="nav-link active">首页</a></li>
            <li><a href="#" class="nav-link">分类</a></li>
            <li><a href="#" class="nav-link">归档</a></li>
            <li><a href="#" class="nav-link">关于</a></li>
            </ul>
        </div>
        <div class="nav-user">
            <div class="user-info">
            <img :src="user.avatar" :alt="user.name" class="user-avatar">
            <span class="user-name">{{ user.name }}</span>
            </div>
        </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-container {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 100%;
  border-bottom: rgba(60, 60, 60, 0.1) 1px solid;
}

.nav-logo .nav-items .nav-user {
  display: flex;
  align-items: center;
}

.nav-logo{
    width: 260px;
    padding-left: 20px;
}

.nav-items{
    flex: 1;
    text-align: center;
    padding: 40px;
}


.nav-user{
    padding-right: 20px;
}

.logo {
  margin-right: 36px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #42b883;
}

.nav-links {
  display: flex;
  list-style: none;
  justify-content: right;
}

.nav-link {
  display: block;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.25s;
}

.nav-link:hover {
  color: #42b883;
}

.nav-link.active {
  color: #42b883;
  font-weight: 600;
}

.nav-user {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>