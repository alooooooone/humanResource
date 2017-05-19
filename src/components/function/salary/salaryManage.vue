<template>
	<div class="row">
		<table class="table table-striped">
			<caption>公司职位薪资</caption>
			<thead>
				<tr>
					<th>编号</th>
					<th>部门</th>
					<th>岗位名称</th>
					<th>薪资</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in all_work">
					<td>{{index+1}}</td>
					<td>{{item.depart}}</td>
					<td>{{item.workname}}</td>
					<td>{{item.salary}}</td>
					<td><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#workdetail" @click="detail(index)">调整</button></td>
				</tr>
			</tbody>
		</table>
		<button class="btn btn-primary" data-toggle="modal" data-target="#newWork">添加新职位</button>
		<div class="modal fade" id="newWork" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>职位编辑</h3>
					</div>
					<div class="modal-body">
					<div class="form-group">
						<div class="form-horizontal">
						  <div class="form-group">
						  	<label class="control-label col-sm-2">岗位名称</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="text" class="form-control" v-model="newWork.workname">
						  	</div>
						  </div>
						  <div class="form-group">
						  	<label class="control-label col-sm-2">所属部门</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="text" class="form-control" v-model="newWork.depart">
						  	</div>
						  </div>
						  <div class="form-group">
						  	<label class="control-label col-sm-2">薪资</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="num" class="form-control" v-model="newWork.salary">
						  	</div>
						  </div>
						</div>
					</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="addNewWork">提交</button>
						<button class="btn btn-danger" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="workdetail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>职位编辑</h3>
					</div>
					<div class="modal-body">
					<div class="form-group">
						<div class="form-horizontal">
						  <div class="form-group">
						  	<label class="control-label col-sm-2">岗位名称</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="text" class="form-control" v-model="workdetail.workname">
						  	</div>
						  </div>
						  <div class="form-group">
						  	<label class="control-label col-sm-2">所属部门</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="text" class="form-control" v-model="workdetail.depart">
						  	</div>
						  </div>
						  <div class="form-group">
						  	<label class="control-label col-sm-2">薪资</label>
						  	<div class="col-sm-10 form-inline">
						  		<input type="num" class="form-control" v-model="workdetail.salary">
						  	</div>
						  </div>
						</div>
					</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="change">确认修改</button>
						<button class="btn btn-danger" data-dismiss="modal">取消</button>
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
				workdetail: {},
				all_work: [],
				newWork: {}
			}
		},
		mounted:function() {
			this.$http.get('/api/user/allwork')
			.then((res) => {
				this.all_work = res.body;
			})
		},
		methods:{
			detail: function(index) {
				this.workdetail = this.all_work[index];
			},
			change: function() {
				this.$http.post('/api/user/changeSM',this.workdetail)
				.then((res) => {
					console.log(res.body.msg);
				})
				$('#workdetail').modal('hide')
			},
			addNewWork: function() {
				this.$http.post('/api/user/addNewWork',this.newWork)
				.then((res) => {
					console.log(res.body.msg);
				})
				$('#newWork').modal('hide')
			}
		}
	}
</script>