<template>
  <div>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="/welcome/train/traininfo">培训信息</a></li>
        <li><a href="/welcome/train/alltraininfo">培训档案</a></li>
        <li><a href="#">培训类别</a></li>
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