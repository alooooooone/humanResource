<template>
	<div class="row">
		<table class="table table-striped">
			<caption>通过面试者</caption>
			<thead>
				<tr>
					<th class="col-sm-3">编号</th>
					<th class="col-sm-3">姓名</th>
					<th class="col-sm-3">电话</th>
					<th class="col-sm-3">邮箱</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in talent">
					<td class="col-sm-3">{{ item.id }}</td>
					<td class="col-sm-3">{{ item.name }}</td>
					<td class="col-sm-3">{{ item.phone }}</td>
					<td class="col-sm-3">{{ item.email }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				talent: []
			}
		},
		mounted: function(){
			this.$http.get('/api/user/getTalent')
			.then((res) => {
				this.talent = res.body;
			})
		}
	}
</script>