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
            员工界面
          </a>
        </div>
        <button class="btn btn-default navbar-btn navbar-right" data-toggle="modal" data-target="#modal-example" id="exit">退出</button>
        <button class="btn btn-default navbar-btn navbar-right" v-on:click.prevent>{{username}}</button>
      </div>
    </nav>
    <div class="row" id="main">
    	<div class="col-sm-3">
    		<ul class="nav nav-pills nav-stacked" style="text-align: center">
    			<li role="presentation"><a href="/staff/personalInfo">个人信息</a></li>
    			<li role="presentation"><a href="/staff/personalCheck">个人考勤</a></li>
    			<li role="presentation"><a href="/staff/personalTrain">个人培训</a></li>
    			<li role="presentation"><a href="/staff/safeSetting">安全设置</a></li>
    		</ul>
    	</div>
    	<div class="col-sm-9">
    		<router-view></router-view>
    	</div>
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
				username: JSON.parse(sessionStorage.getItem('status')).username
			}
		},
		created: function(){
			var status = JSON.parse(sessionStorage.getItem('status'));
			if(!status.pass && status.kind != 'staff'){
				this.$router.replace({path:'/'});
			}
		},
		mounted: function() {
			$('ul.nav > li').click(function (e) {
				$('ul.nav > li').removeClass('active');
				$(this).addClass('active');
			});
		},
    methods: {
      exit:function () {
        var str = JSON.stringify({'username':'none','pass':false});
        sessionStorage.setItem('status',str);
        $('#modal-example').modal('hide');
        this.$router.push({path:'/'});
      }
    }
	}
</script>
<style>
	ul li:active{
		background-color: 'blue'
	}
</style>