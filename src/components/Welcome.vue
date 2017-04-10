<template>
<div class="container-fluid">
  <div class="row">
    <nav class="navbar">
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-example">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="/" class="navbar-brand">
            人力资源管理系统
          </a>
        </div>
        <button class="btn btn-default navbar-btn navbar-right" data-toggle="modal" data-target="#modal-example" id="exit">退出</button>
        <button class="btn btn-default navbar-btn navbar-right" v-on:click.prevent>{{username}}</button>
      </div>
    </nav>
    <div class="col-sm-12">
    	<ul class="nav nav-tabs">
    	  <li><a href="/welcome/hr"><span class="glyphicon glyphicon-education"></span> 招聘管理</a></li>
    	  <li><a href="/welcome/human"><span class="glyphicon glyphicon-user"></span> 人事管理</a></li>
    	  <li><a href="/welcome/check"><span class="glyphicon glyphicon-time"></span> 考勤管理</a></li>
    	  <li><a href="/welcome/train"><span class="glyphicon glyphicon-blackboard"></span> 培训管理</a></li>
    	  <li><a href="/welcome/salary"><span class="glyphicon glyphicon-credit-card"></span> 工资管理</a></li>
    	  <li><a href="/welcome/setting"><span class="glyphicon glyphicon-cog"></span> 系统设置</a></li>
    	</ul>
    </div>
    <div class="col-sm-12" id="main">
    	<router-view></router-view>
    </div>
  </div>
  <div class="modal fade" id="modal-example" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>退出界面</h3>
        </div>
        <div class="modal-body">
					<div>确认退出？</div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" data-dismiss="modal">取消</button>
          <button class="btn btn-primary" v-on:click.prevent="exit">退出</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		data() {
			return {
				pass: false,
				username: JSON.parse(sessionStorage.getItem('status')).username
			}
		},
		created: function(){
			var status = JSON.parse(sessionStorage.getItem('status')).pass;
			if(!status){
				this.$router.replace({path:'/'});
			}
		},
		methods: {
			exit(){
				var str = JSON.stringify({'username':'none','pass':false});
				sessionStorage.setItem('status',str);
				$('#modal-example').modal('hide');
				this.$router.push({path:'/'});
			}
		}
	}
</script>
<style>
  #exit{
    margin-left: 15px;
    margin-right: 5px;
  }
  @media (max-width: 767px) {
    #exit{
      position: absolute;
      top: 0;
      right: 72px;
    }
  }
  #main{
  	margin-top: 3rem;
  }
</style>