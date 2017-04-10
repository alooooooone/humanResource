<template>
  <div>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="/welcome/human/staffinfo">人事基本信息管理</a></li>
        <li><a href="#">人事档案</a></li>
        <li><a href="#">人事变动</a></li>
        <li><a href="#">合同管理</a></li>
        <li><a href="#">工种类型</a></li>
        <li><a href="#">职位类型</a></li>
        <li><a href="#">员工状态</a></li>
        <li><a href="#">专业资料</a></li>
        <li><a href="#">学历类型</a></li>
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