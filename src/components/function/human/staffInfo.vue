<template>
	<div>
		<div class="form-inline">
			<div class="form-group">
				<input type="text" name="serch" class="form-control" placeholder="员工姓名／职位／部门" v-model="searchkey">
			</div>
			<button class="btn btn-primary" @click="search">查询</button>
		</div>
		<table class="table" v-if="searchflag">
			<caption>查询结果</caption>
			<thead>
				<tr>
					<th>员工编号</th>
					<th>员工姓名</th>
					<th>员工职位</th>
					<th>员工部门</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in searchResult">
					<td>{{item.id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.duties}}</td>
					<td>{{item.depart}}</td>
					<td><a href='' v-on:click='searchDetail(index)' data-toggle="modal" data-target="#staffdetail">详情信息>>></a></td>
				</tr>
			</tbody>
		</table>
		<table class="table">
			<thead>
				<tr>
					<th>姓名</th>
					<th>家庭住址</th>
					<th>电话号码</th>
					<th>在职状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in staffInfo">
					<td class="col-sm-2">{{item.name}}</td>
					<td class="col-sm-2">{{item.address}}</td>
					<td class="col-sm-2">{{item.phone}}</td>
					<td class="col-sm-2">{{item.status}}</td>
					<td class="col-sm-3"><a href='' v-on:click='detail(index)' data-toggle="modal" data-target="#staffdetail">详情信息>>></a></td>
				</tr>
			</tbody>
		</table>
		<nav>
		  <ul class="pagination">
		    <li>
		      <a href="#" aria-label="Previous">
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
		    <li v-for="index in Math.ceil(length/10)"><a href="#">{{index}}</a></li>
		    <li>
		      <a href="#" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		  </ul>
		</nav>
		<div class="modal fade" id="staffdetail" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>{{staffdetail.name+' 的详情信息'}}</h3>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-sm-4">
								<label for="name">姓名:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.name">
							</div>
							<div class="form-group col-sm-4">
								<label for="sex">性别:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.sex">
							</div>
							<div class="form-group col-sm-4">
								<label for="birth">出生日期:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.birth">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label for="education">学历:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.education">
							</div>
							<div class="form-group col-sm-4">
								<label for="profession">专业:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.profession">
							</div>
							<div class="form-group col-sm-4">
								<label for="address">家庭住址:</label>
								<input type="text" v-bind:readonly='flag' v-model="staffdetail.address">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label for="duties">职位:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.duties">
							</div>
							<div class="form-group col-sm-4">
								<label for="salary">薪水:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.salary">
							</div>
							<div class="form-group col-sm-4">
								<label for="checkin">入职时间:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.checkin">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label for="depart">所属部门:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.depart">
							</div>
							<div class="form-group col-sm-4">
								<label for="status">在职状态:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.status">
							</div>
							<div class="form-group col-sm-4">
								<label for="phone">电话号码:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.phone">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-4">
								<label for="depart">身份证号:</label>
								<input type="text" v-bind:readonly="flag" v-model="staffdetail.idnumber">
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" v-on:click.prevent="edit" v-bind:style="editbtn">编辑</button>
						<button class="btn btn-primary" v-on:click.prevent="save" v-bind:style="display">保存</button>
						<button class="btn btn-primary" v-on:click.prevent='cancle' v-bind:style="display">取消</button>
						<button class="btn btn-danger" v-on:click.prevent='deleteStaff'>删除</button>
						<button class="btn btn-default" data-dismiss="modal" v-on:click.prevent='cancle'>退出</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return	{
				staffInfo: [],
				staffdetail: {},
				flag: true,
				editbtn: 'display:inline-block',
				display: "display:none",
				length: 0,
				searchkey: '',
				searchResult: [],
				searchlength: 0,
				searchflag: false
			}
		},
		methods: {
			detail: function (index) {
				this.staffdetail = this.staffInfo[index];
			},
			searchDetail: function (index) {
				this.staffdetail = this.searchResult[index];
			},
			edit:function () {
				this.display = "display:inline-block";
				this.editbtn = "display:none",
				this.flag = false;
			},
			save:function () {
				var staff = staffdetail;
			  var self = this;
				this.$http.post('/api/user/updateStaff',this.staffdetail)
				.then((res) => {
					//console.log(res);
					self.flag = true;
					self.display = 'display:none';
					self.editbtn = '编辑';
				})
			},
			cancle: function () {
				this.flag = true;
				this.display = 'display:none';
				this.editbtn = '编辑';
			},
			search: function () {
				var search = {};
				search.searchkey = this.searchkey;
				this.$http.post('/api/user/search',search)
				.then((res) => {
					console.log(res);
					this.searchResult = res.body;
					this.searchlength = res.body.length;
					this.searchflag = true;
				});
			},
			deleteStaff: function () {
				self = this;
				this.$http.post('/api/user/deleteStaff',this.staffdetail)
				.then((res) => {
					self.staffInfo.splice(self.staffInfo.indexOf(self.staffdetail),1);
					console.log(res.body.msg)
				})
			}
		},
		mounted: function () {
			this.$http.get('/api/user/staffInfo')
			.then((res)=>{
				//console.log(res);
				this.staffInfo = res.body;
				this.length = res.body.length;
			})
		}
	}
</script>