<template>
	<div class="row">
		<h3>现在是北京时间 {{currentTime.toLocaleString()}}</h3>
		<button class="btn btn-primary" @click="checkinAM">上班打卡</button>
		<button class="btn btn-primary" @click="checkinPM">下班打卡</button>
		<button class="btn btn-danger" data-toggle="modal" data-target="#leave">请假</button>
		<table class="table table-striped">
			<caption>请假信息</caption>
			<thead>
				<tr>
					<th class="col-sm-3">编号</th>
					<th class="col-sm-3">提交时间</th>
					<th class="col-sm-3">状态</th>
					<th class="col-sm-3"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in my_note">
					<td>{{index+1}}</td>
					<td>{{item.releasetime}}</td>
					<td>{{item.status}}</td>
					<td><button class="btn btn-primary btn-sm" @click="detail(index)" data-toggle="modal" data-target="#my_noteDetail">详情</button></td>
				</tr>
			</tbody>
		</table>
		<table class="table table-striped">
			<caption>当月考勤</caption>
			<thead>
				<tr>
					<th class="col-sm-4">编号</th>
					<th class="col-sm-4">时间</th>
					<th class="col-sm-4">备注</th>
				</tr>
			</thead>
			<tbody>
				<h4>上午</h4>
				<tr v-for="(item,index) in my_checkAM">
					<td>{{index+1}}</td>
					<td>{{item.date}}</td>
					<td>{{item.info}}</td>
				</tr>
				<h4>下午</h4>
				<tr v-for="(item,index) in my_checkPM">
					<td>{{index+1}}</td>
					<td>{{item.date}}</td>
					<td>{{item.info}}</td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" tabindex="-1" id="leave">
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
							  		<input type="text" class="form-control" v-model="leave.name">
							  	</div>
							  </div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假时间</label>
									<div class="col-sm-10 form-inline">
										<input type="date" class="form-control" v-model="leave.leavedate">
										到
										<input type="date" class="form-control" v-model="leave.rebackdate">
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假原因</label>
									<div class="col-sm-10">
										<textarea class="form-control" rows="15"  v-model="leave.reason"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="qingjia">提交</button>
						<button class="btn btn-danger" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" tabindex="-1" id="my_noteDetail">
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
							  		<input type="text" class="form-control" v-model="notedetail.name" readonly="true">
							  	</div>
							  </div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假时间</label>
									<div class="col-sm-10 form-inline">
										<input type="date" class="form-control" v-model="notedetail.leavedate" readonly="true">
										到
										<input type="date" class="form-control" v-model="notedetail.rebackdate" readonly="true">
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">请假原因</label>
									<div class="col-sm-10">
										<textarea class="form-control" rows="10"  v-model="notedetail.reason" readonly="true"></textarea>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">驳回原因</label>
									<div class="col-sm-10">
										<textarea class="form-control" rows="5"  v-model="notedetail.backreason" readonly="true"></textarea>
									</div>
								</div>
							</div>
						</div>
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
				currentTime: new Date(),
				leave: {},
				my_note: [],
				notedetail: {},
				my_checkAM: [],
				my_checkPM: []
			}
		},
		mounted: function() {
			this.$http.post('/api/user/mynote',{idnumber: JSON.parse(sessionStorage.getItem('status')).id})
			.then((res) => {
				this.my_note = res.body;
			})
			this.$http.post('/api/user/mycheckAM',{idnumber: JSON.parse(sessionStorage.getItem('status')).id})
			.then((res) => {
				this.my_checkAM = res.body;
			})
			this.$http.post('/api/user/mycheckPM',{idnumber: JSON.parse(sessionStorage.getItem('status')).id})
			.then((res) => {
				this.my_checkPM = res.body;
			})
		},
		methods:{
			checkinAM: function() {
				var time = this.currentTime.getHours()-9;
				var str = '';
				if(time < 0){
					str = '准点上班'
				}else if(time > 1){
					str = '上班迟到'
				}else{
					str = '旷工'
				}
				this.$http.post('/api/user/checkinAM',{ date: this.currentTime.toLocaleString(),info: str,time: time,idnumber: JSON.parse(sessionStorage.getItem('status')).id})
				.then((res) => {
					console.log(res.body.msg);
				})
			},
			checkinPM: function() {
				var time = this.currentTime.getHours()-18;
				var str = '';
				if(time < 0){
					str = '早退';
				}else if(time = 0){
					str = '正常下班'
				}else{
					str = '加班'
				}
				this.$http.post('/api/user/checkinPM',{ date: this.currentTime.toLocaleString(),info: str,time: time,idnumber: JSON.parse(sessionStorage.getItem('status')).id})
				.then((res) => {
					console.log(res.body.msg);
				})
			},
			qingjia: function() {
				this.leave.idnumber = JSON.parse(sessionStorage.getItem('status')).id;
				this.leave.status = '待审核';
				this.leave.releasetime = new Date().toLocaleString();
				this.$http.post('/api/user/qingjia',this.leave)
				.then((res) => {
					console.log(res.body.msg);
				})
				$('#leave').modal('hide');
			},
			detail: function(index) {
				this.notedetail = this.my_note[index];
			}
		}

	}
</script>