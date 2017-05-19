<template>
	<div class="row">
		<table class="table table-striped">
			<caption>员工出勤情况</caption>
			<thead>
				<tr>
					<th class="col-sm-3">编号</th>
					<th class="col-sm-3">时间</th>
					<th class="col-sm-3">身份证号</th>
					<th class="col-sm-3">备注</th>
				</tr>
			</thead>
			<tbody>
				<h4>上午</h4>
				<tr v-for="(item,index) in all_checkAM">
					<td>{{index+1}}</td>
					<td>{{item.date}}</td>
					<td>{{item.idnumber}}</td>
					<td>{{item.info}}</td>
				</tr>
				<h4>下午</h4>
				<tr v-for="(item,index) in all_checkPM">
					<td>{{index+1}}</td>
					<td>{{item.date}}</td>
					<td>{{item.idnumber}}</td>
					<td>{{item.info}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		data(){
			return{
				all_checkAM: [],
				all_checkPM: []
			}
		},
		mounted: function() {
			this.$http.get('/api/user/allcheckAM')
			.then((res) => {
				this.all_checkAM = res.body;
			})
			this.$http.get('/api/user/allcheckPM')
			.then((res) => {
				this.all_checkPM = res.body;
			})
		}
	}
</script>