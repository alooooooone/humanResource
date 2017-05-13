<template>
	<div class="row">
		<table>
			<caption>所有用户</caption>
			<thead>
				<tr>
					<th class="col-sm-3">ID</th>
					<th class="col-sm-3">用户名</th>
					<th class="col-sm-3">密码</th>
					<th class="col-sm-3">权限</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in userInfo">
					<td class="col-sm-3">{{item.id}}</td>
					<td class="col-sm-3">{{item.username}}</td>
					<td class="col-sm-3">{{item.password}}</td>
					<td class="col-sm-3"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				userInfo: []
			}
		},
		mounted: function(){
			this.$http.get('/api/user/allUser')
			.then((res) => {
				this.userInfo = res.body;
			})
		}
	}
</script>