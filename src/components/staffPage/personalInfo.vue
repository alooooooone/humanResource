<template>
	<div class="row">
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="name">姓名:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.name">
			</div>
			<div class="form-group col-sm-4">
				<label for="sex">性别:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.sex">
			</div>
			<div class="form-group col-sm-4">
				<label for="birth">出生日期:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.birth">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="education">学历:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.education">
			</div>
			<div class="form-group col-sm-4">
				<label for="profession">专业:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.profession">
			</div>
			<div class="form-group col-sm-4">
				<label for="address">家庭住址:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.address">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="duties">职位:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.duties">
			</div>
			<div class="form-group col-sm-4">
				<label for="salary">薪水:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.salary">
			</div>
			<div class="form-group col-sm-4">
				<label for="checkin">入职时间:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.checkin">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label for="depart">所属部门:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.depart">
			</div>
			<div class="form-group col-sm-4">
				<label for="status">在职状态:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.status">
			</div>
			<div class="form-group col-sm-4">
				<label for="phone">电话号码:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.phone">
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				personalDetail: {},
				flag: true
			}
		},
		mounted: function() {
			this.$http.post('/api/user/personalDetail',{
				username: '刘杰龙'
			})
			.then((res) => {
				this.personalDetail = res.body
			})
		}
	}
</script>