<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>应聘岗位</th>
					<th>姓名</th>
					<th>电话号码</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in applicants">
					<td class="col-sm-4">{{item.jobname}}</td>
					<td class="col-sm-3">{{item.name}}</td>
					<td class="col-sm-3">{{item.phone}}</td>
					<td class="col-sm-2"><a href="" data-toggle="modal" data-target="#resume" @click.prevent="resumeDetail(index)">详情信息>>></a></td>
				</tr>
			</tbody>
		</table>
		<div class="modal fade" id="resume">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>应聘岗位: {{resume.jobname}}</h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-sm-4">
								<label>姓名 :</label>
								<input type="text" v-model="resume.name" v-bind:readonly="flag">
							</div>
							<div class="form-group col-sm-4">
								<label>性别 :</label>
								<input type="text" v-model="resume.sex" v-bind:readonly="flag">
							</div>
							<div class="form-group col-sm-4">
								<label>电话号码 :</label>
								<input type="text" v-model="resume.phone" v-bind:readonly="flag">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label>毕业院校 :</label>
								<input type="text" v-model="resume.education" v-bind:readonly="flag">
							</div>
							<div class="form-group col-sm-4">
								<label>专业 :</label>
								<input type="text" v-model="resume.profession" v-bind:readonly="flag">
							</div>
							<div class="form-group col-sm-4">
								<label>电子邮箱 :</label>
								<input type="email" v-model="resume.email" v-bind:readonly="flag">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>技术栈</label>
								<textarea class="form-control" rows="3" v-bind:style="resize" v-model="resume.skills" v-bind:readonly="flag"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-12">
								<label>项目经历</label>
								<textarea class="form-control" rows="8" v-bind:style="resize" v-model="resume.project" v-bind:readonly="flag"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" data-toggle="modal" data-target="#interview">安排面试</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal" id="interview">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>面试安排</h3>
					</div>
					<div class="modal-body">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'hrresume',
		data(){
			return {
				applicants: [],
				resume: {},
				flag: true,
				resize: "resize:none"
			}
		},
		created: function() {
			var self = this;
			this.$http.get('/api/user/getResume')
			.then((res) => {
				self.applicants = res.body;
				console.log(res);
			})
		},
		methods: {
			resumeDetail: function(index) {
				this.resume = this.applicants[index];
			}
		}
	}
</script>