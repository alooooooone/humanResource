<template>
	<div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="name">姓名:</label>
				<input type="text" v-model="newStaff.name" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="sex">性别:</label>
				<input type="text" v-model="newStaff.sex" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="birth">出生日期:</label>
				<input type="text" v-model="newStaff.birth" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="education">学历:</label>
				<input type="text" v-model="newStaff.education" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="profession">专业:</label>
				<input type="text" v-model="newStaff.profession" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="address">家庭住址:</label>
				<input type="text" v-model="newStaff.address" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="duties">职位:</label>
				<input type="text" v-model="newStaff.duties" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="salary">薪水:</label>
				<input type="text" v-model="newStaff.salary" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="checkin">入职时间:</label>
				<input type="text" v-model="newStaff.checkin" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="depart">部门:</label>
				<input type="text" v-model="newStaff.depart" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="status">状态:</label>
				<input type="text" v-model="newStaff.status" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="phone">电话号码:</label>
				<input type="text" v-model="newStaff.phone" class="form-control">
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" @click="add">添加</button>
			<button class="btn btn-danger">取消</button>
		</div>
	</div>
</template>
<style>
	.row {
		margin: 5px;
	}
	.modal-footer {
		margin-right: 30px;
	}
</style>
<script>
	export default{
		data(){
			return {
				newStaff: {}
			}
		},
		methods: {
			add: function() {
				this.$http.post('/api/user/addNewStaff',this.newStaff)
				.then((res) => {
					console.log(res.body.msg);
				});
			}
		}
	}
</script>