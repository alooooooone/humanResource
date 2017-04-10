<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>职位名称</th>
					<th>职位类别</th>
					<th>工作类型</th>
					<th>工作地点</th>
					<th>招聘人数</th>
					<th>发布时间</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in hrInfo">
					<td class="col-sm-3">{{item.jobname}}</td>
					<td class="col-sm-2">{{item.jobkind}}</td>
					<td class="col-sm-1">{{item.jobtype}}</td>
					<td class="col-sm-1">{{item.jobaddress}}</td>
					<td class="col-sm-1">{{item.jobquantity}}</td>
					<td class="col-sm-2">{{item.releasetime}}</td>
					<td class="col-sm-2"><a href="" data-toggle="modal" data-target="#detail" v-on:click="jobDetail(index)"><span class="glyphicon glyphicon-heart"></span> 详情>>></a></td>
				</tr>
			</tbody>
		</table>
		<div>
			<button class="btn btn-primary" data-toggle="modal" data-target="#hireinfo">添加新职位</button>
		</div>
		<div class="modal fade" id="detail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>{{jobInfo.jobname}}<small>发布时间:{{jobInfo.releasetime}}</small></h3>
					</div>
					<div class="modal-body">
						<div class="row">
						  <div class="form-group col-sm-4">
						  	<label>工作地点:</label>
						  	<input type="text" v-bind:readonly='flag' v-model="jobInfo.jobaddress">
						  </div>
							<div class="form-group col-sm-4">
								<label>学历:</label>
								<input type="text" v-bind:readonly='flag' v-model="jobInfo.education">
							</div>
							<div class="form-group col-sm-4">
								<label>工作年限:</label>
								<input type="text" v-bind:readonly='flag' v-model="jobInfo.workyears">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位描述:</label>
								<textarea v-model="jobInfo.jobdescription" v-bind:readonly='flag' rows="5" class="form-control"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位要求:</label>
								<textarea v-model="jobInfo.jobrequirements" v-bind:readonly='flag' rows="5" class="form-control"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-danger" @click.prevent="edit" v-bind:style="editbtn">修改</button>
						<button class="btn btn-primary" @click.prevent="save" v-bind:style="savebtn">保存</button>
						<button class="btn btn-primary"  v-bind:style="savebtn" @click.prevent="exit">取消</button>
						<button class="btn btn-danger">删除</button>
						<button class="btn btn-primary" data-dismiss="modal" @click.prevent="exit">退出</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="hireinfo" tabindex='-1'>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>添加新职位</h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-sm-6">
								<label>职位名称:</label>
								<input type="text" v-model="newhireinfo.jobname">
							</div>
							<div class="form-group col-sm-6">
								<label>职位类别:</label>
								<input type="text" v-model="newhireinfo.jobkind">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label>工作类型:</label>
								<input type="text" v-model="newhireinfo.jobtype">
							</div>
							<div class="form-group col-sm-6">
								<label>工作地点:</label>
								<input type="text" v-model="newhireinfo.jobaddress">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label>最高学历:</label>
								<input type="text" v-model="newhireinfo.education">
							</div>
							<div class="form-group col-sm-6">
								<label>工作年限:</label>
								<input type="text" v-model="newhireinfo.workyears">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label>招聘人数:</label>
								<input type="text" v-model="newhireinfo.jobquantity">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位描述:</label>
								<textarea v-model="newhireinfo.jobdescription" rows="5" class="form-control"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位要求:</label>
								<textarea v-model="newhireinfo.jobrequirements" rows="5" class="form-control"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click="addHireInfo">确认添加</button>
						<button class="btn btn-danger" @click="cancleHireInfo">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import $ from 'jquery'
	export default{
		name: 'hrInfo',
		data(){
			return {
				hrInfo: [],
				jobInfo: {},
				flag: true,
				editbtn: "display:inline-block",
				savebtn: "display:none",
				newhireinfo: {}
			}
		},
		mounted: function () {
			this.$http.get('/api/user/hrInfo')
			.then((res) => {
				this.hrInfo = res.body;
				console.log(res);
			})
		},
		methods: {
			jobDetail: function(index) {
				this.jobInfo = this.hrInfo[index];
			},
			edit: function() {
				this.flag = false;
				this.editbtn = "display:none";
				this.savebtn = "display:inline-block";
			},
			exit: function() {
				this.editbtn = "display:inline-block";
				this.savebtn = "display:none";
			},
			save: function() {
				var self = this;
				this.jobInfo.releasetime = new Date().toLocaleDateString();
				this.$http.post('/api/user/updateHrInfo',self.jobInfo)
				.then((res) => {
					console.log(res);
				});
				this.flag = true;
				this.editbtn = "display:inline-block";
				this.savebtn = "display:none";
			},
			addHireInfo: function() {
				var self = this;
				this.newhireinfo.releasetime = new Date().toLocaleDateString();
				this.$http.post('/api/user/addHireInfo',self.newhireinfo)
				.then((res) => {
					console.log(res);
					//self.hrInfo.push(self.newhireinfo);
					Location.reload();
				});
				this.newhireinfo = {};
				$('#hireinfo').modal('hide');
			},
			cancleHireInfo: function() {
				this.newhireinfo = {};
				$('#hireinfo').modal('hide');
			}
		}
	}
</script>