<template>
	<div class="row">
		<table class="table table-striped">
			<caption>公司培训公告</caption>
			<thead>
				<tr>
					<th class="col-sm-1">编号</th>
					<th class="col-sm-3">培训主题</th>
					<th class="col-sm-2">培训人员</th>
					<th class="col-sm-2">培训时间</th>
					<th class="col-sm-2">培训地点</th>
					<th class="col-sm-2"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in trainInfo">
					<td class="col-sm-1">{{ item.id }}</td>
					<td class="col-sm-3">{{ item.topic }}</td>
					<td class="col-sm-2">{{ item.staff }}</td>
					<td class="col-sm-2">{{ item.date }}</td>
					<td class="col-sm-2">{{ item.place }}</td>
					<td class="col-sm-2"><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detail" @click="showDetail(index)">详情</button></td>
				</tr>
			</tbody>
		</table>
		<table class="table table-striped">
			<caption>个人培训心得</caption>
			<thead>
				<tr>
					<th class="col-sm-4">时间</th>
					<th class="col-sm-4">主题</th>
					<th class="col-sm-4"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in personalT">
					<td class="col-sm-4">{{item.date}}</td>
					<td class="col-sm-4">{{item.topic}}</td>
					<td class="col-sm-4"><button class="btn btn-primary btn-sm" @click="show(index)" data-toggle="modal" data-target="#personalDetail">详情</button></td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="detail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>主题: {{ detail.topic }}</h3>
					</div>
					<div class="modal-body">
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训人员</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="detail.staff" readonly="true">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训时间</label>
								<div class="col-sm-10 form-inline">
									<input type="text" class="form-control" v-model="detail.date" readonly="true">
									<input type="text" class="form-control" v-model="detail.time" readonly="true">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训地点</label>
								<div class="col-sm-10 form-inline">
									<input type="text" class="form-control" v-model="detail.place" readonly="true">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训内容</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="15"  v-model="detail.content" readonly="true"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" data-toggle="modal" data-target="#write">填写个人培训档案</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="write" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>主题: {{ detail.topic }} <small>个人培训档案</small></h3>
					</div>
					<div class="modal-body">
						<div class="row form-inline">
							<div class="form-group col-sm-4">
								<label for="name">姓名:</label>
								<input type="text" class="form-control" v-model="personalTrain.name">
							</div>
							<div class="form-group col-sm-4">
								<label for="sex">性别:</label>
								<input type="text" class="form-control" v-model="personalTrain.sex">
							</div>
							<div class="form-group col-sm-4">
								<label for="birth">身份证号:</label>
								<input type="text" class="form-control" v-model="personalTrain.idnumber">
							</div>
						</div>
						<div class="row form-inline">
							<div class="form-group col-sm-4">
								<label for="name">所属部门:</label>
								<input type="text" class="form-control" v-model="personalTrain.depart">
							</div>
							<div class="form-group col-sm-4">
								<label for="sex">职位:</label>
								<input type="text" class="form-control" v-model="personalTrain.duties">
							</div>
							<div class="form-group col-sm-4">
								<label for="birth">培训时间:</label>
								<input type="date" class="form-control" v-model="personalTrain.date">
							</div>
						</div>
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训内容</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="5" v-model="personalTrain.content"></textarea>
								</div>
							</div>
						</div>
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训心得</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="10" v-model="personalTrain.experience"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="send">提交</button>
					</div>
				</div>
			</div>
		</div>
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
				trainInfo: [],
				newTrainInfo: {},
				detail: {},
				personalTrain: {},
				personalT: [],
				personalDetail: {}
			}
		},
		mounted: function() {
			this.$http.get('/api/user/trainInfo')
			.then((res) => {
				this.trainInfo = res.body;
			})
			this.$http.post('/api/user/getPersonalT',{
				idnumber: JSON.parse(sessionStorage.getItem('status')).id
			})
			.then((res) => {
				this.personalT = res.body;
			})
		},
		methods: {
			showDetail: function(index) {
				this.detail = this.trainInfo[index];
			},
			send: function() {
				this.personalTrain.topic = this.detail.topic;
				this.$http.post('/api/user/personalTrain',this.personalTrain)
				.then((res) => {
					console.log(res.body.msg);
				})
			},
			show: function(index) {
				this.personalDetail = this.personalT[index];
			}
		}
	}
</script>