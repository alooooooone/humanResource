<template>
	<div class="row">
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.name" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.sex" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="birth">出生日期:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.birth" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="education">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.education" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="profession">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.profession" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="address">家庭住址:</label>
				<input type="text" v-bind:readonly='flag' v-model="personalDetail.address" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="duties">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.duties" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="salary">薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.salary" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="checkin">入职时间:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.checkin" class="form-control">
			</div>
		</div>
		<div class="row form-inline">
			<div class="form-group col-sm-4">
				<label for="depart">所属部门:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.depart" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="status">在职状态:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.status" class="form-control">
			</div>
			<div class="form-group col-sm-4">
				<label for="phone">电话号码:</label>
				<input type="text" v-bind:readonly="flag" v-model="personalDetail.phone" class="form-control">
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
				idnumber: JSON.parse(sessionStorage.getItem('status')).id
			})
			.then((res) => {
				this.personalDetail = res.body[0]
			})
		}
	}
</script>