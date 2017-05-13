<template>
	<div class="row">
		<div class="form-horizontal">
			<div class="form-group">
			  <label class="col-sm-2 control-label">新密码</label>
			  <div class="col-sm-3">
			    <input type="password" class="form-control" v-model="user.first_new_ps">
			  </div>
			</div>
			<div class="form-group">
			  <label class="col-sm-2 control-label">确认新密码</label>
			  <div class="col-sm-3">
			    <input type="password" class="form-control" v-model="user.second_new_ps">
			  </div>
			</div>
			<div class="form-group">
			  <div class="col-sm-offset-2 col-sm-3">
			    <button class="btn btn-default" @click="send">提交</button>
			  </div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				user: {
					name: JSON.parse(sessionStorage.getItem('status')).username,
					first_new_ps: '',
					second_new_ps: ''
				}
			}
		},
		methods: {
			send: function () {
				this.$http.post('/api/user/changePs',this.user)
				.then((res) => {
					console.log(res.body.msg);
				})
			}
		}
	}
</script>