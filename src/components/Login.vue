<template>
	<div class="container-fluid">
		<div class="main">
			<h1 id="title">企业人力资源管理系统</h1>
			<div id="login">
				<div class="form-horizontal">
					<div class="form-group">
					  <label for="username" class="col-sm-2 control-label">用户名:</label>
					  <div class="col-sm-9">
					    <input type="username" class="form-control" id="username" v-model="username">
					  </div>
					</div>
					<div class="form-group">
					  <label for="password" class="col-sm-2 control-label">密码:</label>
					  <div class="col-sm-9">
					    <input type="password" class="form-control" id="password" v-model="password">
					  </div>
					</div>
					<div class="form-group userKind radio">
						<label><input type="radio" value="staff" name="loginKind" v-model="userKind">员  工</label>
						<label><input type="radio" value="manager" name="loginKind" v-model="userKind">管理员</label>
					</div>
					<div class="btn-group">
						<button class="btn btn-primary" v-on:click.prevent="checkUser">登录</button>
						<button class="btn" v-on:click.prevent="createChecknum" data-toggle="modal" data-target="#register">注册</button>
					</div>
				</div>
			</div>
			<footer>
				<ul>
					<li>
						<a href="/hr">加入我们</a>
					</li>
					<li>
						<a href="#">联系我们</a>
					</li>
					<li>
						<a href="#">建议反馈</a>
					</li>
					<li>
						<a href="#">举报投诉</a>
					</li>
				</ul>
				<span class="copy">  © 2017</span>
			</footer>
		</div>
	  <div class="modal fade" id="register" tabindex="-1" data-backdrop="static">
	    <div class="modal-dialog">
	      <div class="modal-content">
	        <div class="modal-header">
	          <h3>注册界面</h3>
	        </div>
	        <div class="modal-body">
						<form v-bind:style="test1" class="form-horizontal">
							<div class="form-group userKind radio">
								<label><input type="radio" value="staff" name="Kind" v-model="newUser.regist">员  工</label>
								<label><input type="radio" value="manager" name="Kind" v-model="newUser.regist">管理员</label>
							</div>
							<div class="form-group">
							  <label for="newuser" class="col-sm-3 control-label">用户名:</label>
							  <div class="col-sm-8">
							    <input type="text" class="form-control" id="newuser" v-model="newUser.username">
							  </div>
							</div>
							<div class="form-group">
							  <label for="newuser" class="col-sm-3 control-label">身份证号:</label>
							  <div class="col-sm-8">
							    <input type="text" class="form-control" id="newuser" v-model="newUser.idnumber">
							  </div>
							</div>
							<div class="form-group">
							  <label for="firstpass" class="col-sm-3 control-label">密码:</label>
							  <div class="col-sm-8">
							    <input type="password" class="form-control" id="firstpass" v-model="newUser.firstpass">
							  </div>
							</div>
							<div class="form-group">
							  <label for="secondpass" class="col-sm-3 control-label">确认密码:</label>
							  <div class="col-sm-8">
							    <input type="password" class="form-control" id="secondpass" v-model="newUser.secondpass">
							  </div>
							</div>
							<div class="form-group">
								<label for="inputchecknum" class="col-sm-3 control-label">验证码:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="inputchecknum" v-model="inputchecknum">
								</div>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="checknum" v-model="checknum" readonly>
								</div>
							</div>
						</form>
						<p v-bind:style="test2">
							注册成功... {{second}} 跳转登录页面
						</p>
	        </div>
	        <div class="modal-footer">
						<div v-bind:style='test1'>
							<button class="btn btn-danger" data-dismiss="modal">取消</button>
							<button class="btn btn-primary" v-on:click.prevent="addUser">确认</button>
						</div>
						<div v-bind:style='test2'>
							<button class="btn btn-primary" v-on:click.prevent="login">立即登录</button>
						</div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default {
		data() {
			return{
				username: 'admin',
				password: 'admin',
				test1: '',
				test2: 'display:none',
				second: 5,
				checknum: 0,
				inputchecknum: '',
				userKind: 'staff',
				regist: 'staff',
				newUser: {}
			}
		},
		created: function () {
			var str = JSON.stringify({'username':'none','pass':false});
			sessionStorage.setItem('status',str);
		},
		methods: {
			addUser() {
				var timer = null;
				var self = this;
				if(this.newUser.firstpass == this.newUser.secondpass){
					var pass = this.newUser.firstpass;
				}else{
					alert('两次密码输入不相同');
					return false;
				}
				if(this.checknum != this.inputchecknum){
					console.log('验证码输入错误');
					self.createChecknum();
					return false;
				}
				this.$http.post('/api/user/addUser',this.newUser)
				.then((res)=>{
					if(res.body.status == '100'){
						this.test1 = 'display:none';
						this.test2 = 'display:block';
					}
				});
				timer = setInterval(function () {
					self.second--;
					if(self.second == 0){
						self.login();
						clearTimeout(timer);
						$('#register').modal('hide');
					}
				},1000);
			},
			checkUser() {
				var name = this.username;
				var pass = this.password;
				this.$http.post('/api/user/checkUser',{
					username: name,
					password: pass,
					userKind: this.userKind
				}).then((res)=>{
					console.log(res)
					if(res.body.status=='100'){
						if(this.userKind === 'manager'){
							var str = JSON.stringify({'username':this.username,'pass':true,'kind':this.userKind});
							sessionStorage.setItem('status',str);
							this.$router.push({path:'/welcome'});
						}else{
							var str = JSON.stringify({'username':this.username,'pass':true,'kind':this.userKind,'id':res.body.id});
							sessionStorage.setItem('status',str);
							this.$router.push({path:'/staff'});
						}
					}else{
						alert(res.body.msg);
					}
				})
			},
			login(){
				$('#register').modal('hide');
				//location.reload();
			},
			createChecknum(){
				this.checknum = Math.floor(Math.random()*10000);
			}
		}
	}
</script>
<style>
	body{
		height: 100vh
	}
	#login{
		position: absolute;
		top: 0;right: 0;bottom: 0;left: 0;
		margin: auto;
		width: 50rem;
		height: 30rem;
		padding: 5rem;
	}
	#title{
		margin-top: 10rem;
		text-align: center
	}
	.userKind{
		text-align: center;
	}
	.btn-group{
		position: absolute;
		left: 50%;
		transform: translate(-50%,3rem);
	}
	footer{
		padding: 2rem;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		text-align: center;
		color: grey;
	}
	footer ul{
		text-align: center;
	}
	footer ul li{
		display: inline-block;
	}
	footer ul li a{
		color: grey;
	}
	footer ul li a:hover{
		color: grey;
	}
	footer ul li::before{
		content: ' - ';
	}
	footer ul li:first-child::before{
		content: '';
	}
</style>