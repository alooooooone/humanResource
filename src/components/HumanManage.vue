<template>
  <div>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="/welcome/human/staffinfo">人事基本信息管理</a></li>
        <li><a href="/welcome/human/addnewstaff">新员工录入</a></li>
        <li><a href="#">统计分析</a></li>
      </ul>
    </div>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
</style>