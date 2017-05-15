<template>
	<div class="row">
		<table>
			<caption>公司培训公告</caption>
			<thead>
				<tr>
					<th class="col-sm-1">编号</th>
					<th class="col-sm-3">培训主题</th>
					<th class="col-sm-3">培训人员</th>
					<th class="col-sm-3">培训时间</th>
					<th class="col-sm-2"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in trainInfo">
					<td class="col-sm-1">{{ item.id }}</td>
					<td class="col-sm-3">{{ item.topic }}</td>
					<td class="col-sm-3">{{ item.staff }}</td>
					<td class="col-sm-3">{{ item.date }}</td>
					<td class="col-sm-3"><a>详情</a></td>
				</tr>
			</tbody>
		</table>
		<button class="btn btn-primary addNew" data-toggle="modal" data-target="#newTrainInfo">添加培训信息</button>
		<div class="modal fade" id="newTrainInfo" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3>新的培训信息</h3>
					</div>
					<div class="modal-body">
						<div class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-sm-2">培训主题</label>
								<div class="col-sm-10">
									<input type="text" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训人员</label>
								<div class="col-sm-10">
									<input type="text" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训时间</label>
								<div class="col-sm-10 form-inline">
									<input type="date" class="form-control">
									<input type="time" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2">培训内容</label>
								<div class="col-sm-10">
									<textarea class="form-control" rows="18"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary">发布</button>
						<button class="btn btn-danger" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.addNew{
		margin-top: 30px
	}
</style>
<script>
	export default{
		data(){
			return{
				trainInfo: []
			}
		},
		mounted: function() {
			this.$http.get('/api/user/trainInfo')
			.then((res) => {
				this.trainInfo = res.body;
			})
		}
	}
</script>