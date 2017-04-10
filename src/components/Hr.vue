<template>
	<div class="col-sm-12">
		<h3>企业招聘信息</h3>
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
				<tr v-for="(item,index) in hireInfo">
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
		<div class="modal fade" id="detail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>{{jobInfo.jobname}} <small>发布时间:{{jobInfo.releasetime}}</small> <small>工作地点:{{jobInfo.jobaddress}}</small></h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-sm-6">
								<label>学历:</label>
								<input type="text" v-bind:readonly='flag' v-model="jobInfo.education">
							</div>
							<div class="form-group col-sm-6">
								<label>工作年限:</label>
								<input type="text" v-bind:readonly='flag' v-model="jobInfo.workyears">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位描述:</label>
								<textarea v-model="jobInfo.jobdescription" v-bind:readonly='flag' rows="5" class="form-control" v-bind:style="resize"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>岗位要求:</label>
								<textarea v-model="jobInfo.jobrequirements" v-bind:readonly='flag' rows="5" class="form-control" v-bind:style="resize"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click.prevent="fillInResume">投递简历</button>
						<button class="btn btn-danger" data-dismiss="modal" @click.prevent="exit">退出</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="resume">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>填写简历</h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-sm-12">
								<label class="control-label">应聘职位 :</label>
								<input type="text" v-bind:readonly="flag" v-model="jobInfo.jobname">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label>姓名 :</label>
								<input type="text" v-model="applicants.name">
							</div>
							<div class="form-group col-sm-4">
								<label>性别 :</label>
								<div>
									<label class="radio-inline">
									  <input type="radio" name="sex" value="男" v-model="applicants.sex"> 男
									</label>
									<label class="radio-inline">
									  <input type="radio" name="sex" value="女" v-model="applicants.sex"> 女
									</label>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label>电话号码 :</label>
								<input type="text" v-model="applicants.phone">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label>毕业院校 :</label>
								<input type="text" v-model="applicants.education">
							</div>
							<div class="form-group col-sm-4">
								<label>专业 :</label>
								<input type="text" v-model="applicants.profession">
							</div>
							<div class="form-group col-sm-4">
								<label>电子邮箱 :</label>
								<input type="email" v-model="applicants.email">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>技术栈</label>
								<textarea class="form-control" rows="3" v-bind:style="resize" v-model="applicants.skills"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>项目经历</label>
								<textarea class="form-control" rows="8" v-bind:style="resize" v-model="applicants.project"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" @click.prevent="submit">提交</button>
						<button class="btn btn-danger" data-dismiss="modal" @click.prevent="cancle">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import $ from 'jquery'
	export default{
		name: 'Hr',
		data(){
			return {
				hireInfo: [],
				jobInfo: {},
				flag: true,
				applicants: {},
				resize: 'resize:none'
			}
		},
		created: function () {
			var self = this;
			this.$http.get('/api/user/hrInfo')
			.then((res) => {
				self.hireInfo = res.body;
			})
		},
		methods: {
			jobDetail: function(index) {
				this.jobInfo = this.hireInfo[index];
			},
			fillInResume: function() {
				$('#resume').modal('show');
			},
			submit: function() {
				var self = this;
				this.applicants.releasetime = new Date().toLocaleDateString();
				this.applicants.jobname = this.jobInfo.jobname;
				this.$http.post('/api/user/deliverResume',self.applicants)
				.then((res) => {
					console.log(res);
				});
				this.applicants = {};
				$('#resume').modal('hide');
			},
			cancle: function() {
				this.applicants = {};
			}
		}
	}
</script>