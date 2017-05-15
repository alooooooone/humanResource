<template>
	<div class="row">
		<table class="table table-striped">
			<caption>面试安排</caption>
			<thead>
				<tr>
					<th class="col-sm-1">编号</th>
					<th class="col-sm-2">姓名</th>
					<th class="col-sm-2">面试官</th>
					<th class="col-sm-3">面试时间</th>
					<th class="col-sm-2">状态</th>
					<th class="col-sm-2"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in arrange">
					<td class="col-sm-1">{{ item.id }}</td>
					<td class="col-sm-2">{{ item.name }}</td>
					<td class="col-sm-2">{{ item.interviewer }}</td>
					<td class="col-sm-3">{{ item.date +' '+ item.time }}</td>
					<td class="col-sm-2">{{ item.status }}</td>
					<td class="col-sm-2">
						<button class="btn btn-primary btn-sm" @click="pass(index)" v-if="item.pass == '录入人才库'">{{ item.pass }}</button>
						<span class="btn btn-danger btn-sm" v-else>{{ item.pass }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				arrange: []
			}
		},
		mounted: function() {
			this.$http.get('/api/user/getInterview')
			.then((res) => {
				this.arrange = res.body;
			})
		},
		methods: {
			pass: function(index) {
				this.$http.post('/api/user/passInterview',this.arrange[index])
				.then((res) => {
					console.log(res.body.msg);
				})
			}
		}
	}
</script>