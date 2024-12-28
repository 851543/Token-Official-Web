<script setup lang="ts"></script>
<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
<style scoped></style>
