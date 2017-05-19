<template>
	<div class="row">
		<table class="table table-striped">
			<caption>员工请假信息</caption>
			<thead>
				<tr>
					<th class="col-sm-3">编号</th>
					<th class="col-sm-3">提交时间</th>
					<th class="col-sm-3">状态</th>
					<th class="col-sm-3"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in all_note">
					<td>{{index+1}}</td>
					<td>{{item.releasetime}}</td>
					<td>{{item.status}}</td>
					<td><button class="btn btn-primary btn-sm" @click="detail(index)" data-toggle="modal" data-target="#noteDetail">详情</button></td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" tabindex="-1" id="noteDetail">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>请假单</h3>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<div class="form-horizontal">
							  <div class="form-group">
							  	<label class="control-label col-sm-2">姓名</label>
							  	<div class="col-sm-10 form-inline">
							  		<input type="text" class="form-control" v-model="noteDetail.name" readonly="true">
							  	</div>
							  </div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假时间</label>
									<div class="col-sm-10 form-inline">
										<input type="date" class="form-control" v-model="noteDetail.leavedate" readonly="true">
										到
										<input type="date" class="form-control" v-model="noteDetail.rebackdate" readonly="true">
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假原因</label>
									<div class="col-sm-10">
										<textarea class="form-control" rows="10"  v-model="noteDetail.reason" readonly="true"></textarea>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">驳回原因</label>
									<div class="col-sm-10">
										<textarea class="form-control" rows="5"  v-model="noteDetail.backreason"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="pass">通过</button>
						<button class="btn btn-primary" @click="notpass">驳回</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		data(){
			return{
				all_note: [],
				noteDetail: {}
			}
		},
		mounted: function() {
			this.$http.get('/api/user/allnote')
			.then((res) => {
				this.all_note = res.body;
			})
		},
		methods: {
			detail: function(index) {
				this.noteDetail = this.all_note[index];
			},
			pass: function() {
				this.noteDetail.status = '通过';
				this.$http.post('/api/user/passnote',this.noteDetail)
				.then((res) => {
					console.log(res.body.msg);
				})
				$('#noteDetail').modal('hide');
			},
			notpass: function() {
				this.noteDetail.status = '不通过';
				this.$http.post('/api/user/notpassnote',this.noteDetail)
				.then((res) => {
					console.log(res.body.msg);
				})
				$('#noteDetail').modal('hide');
			}
		}
	}
</script>