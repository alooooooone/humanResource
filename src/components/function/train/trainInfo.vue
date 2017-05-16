<template>
	<div class="row">
		<table>
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
		<button class="btn btn-primary addNew" data-toggle="modal" data-target="#newTrainInfo">添加培训信息</button>
		<div class="modal fade" id="newTrainInfo" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>新的培训信息</h3>
					</div>
					<div class="modal-body">
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训主题</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="newTrainInfo.topic">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训人员</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="newTrainInfo.staff">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训时间</label>
								<div class="col-sm-10 form-inline">
									<input type="date" class="form-control" v-model="newTrainInfo.date">
									<input type="time" class="form-control" v-model="newTrainInfo.time">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训地点</label>
								<div class="col-sm-10 form-inline">
									<input type="text" class="form-control" v-model="newTrainInfo.place">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训内容</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="15"  v-model="newTrainInfo.content"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="send">发布</button>
						<button class="btn btn-danger" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
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
				detail: {}
			}
		},
		mounted: function() {
			this.$http.get('/api/user/trainInfo')
			.then((res) => {
				this.trainInfo = res.body;
			})
		},
		methods: {
			send: function() {
				this.$http.post('/api/user/addTrainInfo',this.newTrainInfo)
				.then((res) => {
					console.log(res.body.msg);
				})
			},
			showDetail: function(index) {
				this.detail = this.trainInfo[index];
			}
		}
	}
</script>