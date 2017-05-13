<template>
	<div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="name">姓名:</label>
				<input type="text" v-model="newStaff.name">
			</div>
			<div class="form-group col-sm-4">
				<label for="sex">性别:</label>
				<input type="text" v-model="newStaff.sex">
			</div>
			<div class="form-group col-sm-4">
				<label for="birth">出生日期:</label>
				<input type="text" v-model="newStaff.birth">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="education">学历:</label>
				<input type="text" v-model="newStaff.education">
			</div>
			<div class="form-group col-sm-4">
				<label for="profession">专业:</label>
				<input type="text" v-model="newStaff.profession">
			</div>
			<div class="form-group col-sm-4">
				<label for="address">家庭住址:</label>
				<input type="text" v-model="newStaff.address">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="duties">职位:</label>
				<input type="text" v-model="newStaff.duties">
			</div>
			<div class="form-group col-sm-4">
				<label for="salary">薪水:</label>
				<input type="text" v-model="newStaff.salary">
			</div>
			<div class="form-group col-sm-4">
				<label for="checkin">入职时间:</label>
				<input type="text" v-model="newStaff.checkin">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="depart">所属部门:</label>
				<input type="text" v-model="newStaff.depart">
			</div>
			<div class="form-group col-sm-4">
				<label for="status">在职状态:</label>
				<input type="text" v-model="newStaff.status">
			</div>
			<div class="form-group col-sm-4">
				<label for="phone">电话号码:</label>
				<input type="text" v-model="newStaff.phone">
			</div>
		</div>
		<div class="row">
			<button class="btn btn-primary" @click="add">添加</button>
			<button class="btn btn-danger">取消</button>
		</div>
	</div>
</template>
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