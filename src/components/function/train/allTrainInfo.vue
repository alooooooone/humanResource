<template>
	<div class="row">
		<table class="table table-striped">
			<caption>个人培训心得</caption>
			<thead>
				<tr>
					<th class="col-sm-1">编号</th>
					<th class="col-sm-2">姓名</th>
					<th class="col-sm-3">时间</th>
					<th class="col-sm-3">主题</th>
					<th class="col-sm-3"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in allTrainInfo">
					<td class="col-sm-1">{{item.id}}</td>
					<td class="col-sm-2">{{item.name}}</td>
					<td class="col-sm-3">{{item.date}}</td>
					<td class="col-sm-3">{{item.topic}}</td>
					<td class="col-sm-3"><button class="btn btn-primary btn-sm" @click="show(index)" data-toggle="modal" data-target="#personalDetail">详情</button></td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="personalDetail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>主题: {{ personalDetail.topic }} <small>个人培训档案</small></h3>
					</div>
					<div class="modal-body">
						<div class="row form-inline">
							<div class="form-group col-sm-4">
								<label for="name">姓名:</label>
								<input type="text" class="form-control" v-model="personalDetail.name" readonly="true">
							</div>
							<div class="form-group col-sm-4">
								<label for="sex">性别:</label>
								<input type="text" class="form-control" v-model="personalDetail.sex" readonly="true">
							</div>
							<div class="form-group col-sm-4">
								<label for="birth">身份证号:</label>
								<input type="text" class="form-control" v-model="personalDetail.idnumber" readonly="true">
							</div>
						</div>
						<div class="row form-inline">
							<div class="form-group col-sm-4">
								<label for="name">所属部门:</label>
								<input type="text" class="form-control" v-model="personalDetail.depart" readonly="true">
							</div>
							<div class="form-group col-sm-4">
								<label for="sex">职位:</label>
								<input type="text" class="form-control" v-model="personalDetail.duties" readonly="true">
							</div>
							<div class="form-group col-sm-4">
								<label for="birth">培训时间:</label>
								<input type="date" class="form-control" v-model="personalDetail.date" readonly="true">
							</div>
						</div>
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训内容</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="5" v-model="personalDetail.content" readonly="true"></textarea>
								</div>
							</div>
						</div>
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训心得</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="10" v-model="personalDetail.experience" readonly="true"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.addNew{
		margin-top: 30px
	}
</style>
<script>
	export default{
		data(){
			return{
				allTrainInfo: [],
				personalDetail: {}
			}
		},
		mounted: function() {
			this.$http.get('/api/user/getAllTrainInfo')
			.then((res) => {
				this.allTrainInfo = res.body;
			})
		},
		methods: {
			show: function(index) {
				this.personalDetail = this.allTrainInfo[index];
			}
		}
	}
</script>