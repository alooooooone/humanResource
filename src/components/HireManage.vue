<template>
  <div>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="/welcome/hr/hrInfo">招聘信息管理</a></li>
        <li><a href="/welcome/hr/resume">简历管理</a></li>
        <li><a href="/welcome/hr/arrange">面试安排</a></li>
      </ul>
    </div>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
</style>