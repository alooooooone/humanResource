var models = require('../connectDb');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
    var params = req.body;
    if(params.kind == 'manager'){
    	conn.query($sql.user.exist, [params.username], function(err, result) {
    	    if (err) {
    	        console.log(err);
    	    }else{
    	    	if(result.length == 0){
    	    		conn.query($sql.user.addManager,[params.username,params.firstpass,params.idnumber],function (err,result) {
    	    			if(err){
    	    				console.log(err);
    	    			}else{
    	    				res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
    	    			}
    	    		})
    	    	}else{
    	    		res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
    	    	}
    	    }
    	})
    }else{
    	conn.query($sql.user.existStaff, [params.username], function(err, result) {
    	    if (err) {
    	        console.log(err);
    	    }else{
    	    	if(result.length == 0){
    	    		conn.query($sql.user.addStaff,[params.username,params.firstpass,params.idnumber],function (err,result) {
    	    			if(err){
    	    				console.log(err);
    	    			}else{
    	    				res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
    	    			}
    	    		})
    	    	}else{
    	    		res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
    	    	}
    	    }
    	})
    }
});
//检测账户登录信息
router.post('/checkUser', (req, res) => {
    var sql = $sql.user.check;
    var sql1 = $sql.user.checkStaff;
    var params = req.body;
    if(params.userKind === 'manager'){
    	conn.query(sql, [params.username, params.password], function(err, result) {
    	    if (err) {
    	        throw err;
    	    }else{
    	    	if (result.length == 1) {
    	    	    res.end(JSON.stringify({status:'100',msg:'登录成功'}));
    	    	}else{
    	    		  res.end(JSON.stringify({status:'101',msg:'用户名或密码错误'}));
    	    	}
    	    }
    	})
    }else{
    	conn.query(sql1, [params.username, params.password], function(err, result) {
    	    if (err) {
    	        throw err;
    	    }else{
    	    	if (result.length == 1) {
    	    	    res.end(JSON.stringify({status:'100',msg:'登录成功',id:result[0].idnumber}));
    	    	}else{
    	    		  res.end(JSON.stringify({status:'101',msg:'用户名或密码错误'}));
    	    	}
    	    }
    	})
    }
});
//获取员工信息
router.get('/staffInfo', (req, res) => {
    var sql = $sql.user.staffInfo;
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        }else{
        		res.json(result);
        }
    })
});
//更新员工信息
router.post('/updateStaff',(req,res) => {
	  var sql = $sql.user.updateStaff;
	  var params = req.body;
	  //console.log(req.body);
	  conn.query(sql,[ params.name,params.sex,params.birth,params.education
	  	,params.profession,params.address,params.duties,params.salary
	  	,params.checkin,params.depart,params.status,params.phone,params.idnumber ],function (err,result) {
	  		if(err){
	  			throw err;
	  		}else{
	  			res.end(JSON.stringify({status:'100',msg:'保存成功'}));
	  		}
	  	})
});
//删除员工信息
router.post('/deleteStaff',(req,res) => {
	var sql = $sql.user.deleteStaff;
	var params = req.body;
	conn.query(sql,[params.id],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'删除成功'}));
		}
	})
});
//查询员工
router.post('/search',(req,res) => {
	var sqlname = $sql.user.searchName;
	var sqlduties = $sql.user.searchDuties;
	var sqldepart = $sql.user.searchDepart;
	var sql =  $sql.user.searchInfo;
	var params = req.body;
	conn.query(sql,[params.searchkey,params.searchkey,params.searchkey],function (err,result) {
		if(err){
			throw err;
		}else{
			if(result.length == 0){
				res.end(JSON.stringify({status:'101',msg:'查询不到满足条件的信息'}));
			}else{
				res.json(result);
			}
		}
	});
})
//获取招聘信息
router.get('/hrInfo',(req,res) => {
	var sql = $sql.user.hrInfo;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//更新招聘信息
router.post('/updateHrInfo',(req,res) => {
	  var sql = $sql.user.updateHrInfo;
	  var params = req.body;
	  conn.query(sql,[ params.jobaddress,params.education,params.workyears,params.jobdescription,params.jobrequirements,params.releasetime,params.id],function (err,result) {
	  		if(err){
	  			throw err;
	  		}else{
	  			res.end(JSON.stringify({status:'100',msg:'保存成功'}));
	  		}
	  	})
});
//删除招聘信息
router.post('/deleteHireInfo',(req,res) => {
	var sql = $sql.user.deleteHireInfo;
	var params = req.body;
	conn.query(sql,[params.id],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'删除成功'}));
		}
	})
})
//添加新的招聘信息
router.post('/addHireInfo',(req,res) => {
	var sql = $sql.user.addHireInfo;
	var params = req.body;
	conn.query(sql,[ params.id,params.jobname,params.jobkind,params.jobtype,params.jobaddress,params.jobquantity,params.releasetime,params.education,params.workyears,params.jobdescription,params.jobrequirements ],function(err,result){
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'添加成功'}));
		}
	})
})
//应聘信息
router.post('/deliverResume',(req,res) => {
	var sql = $sql.user.deliverResume;
	var params = req.body;
	conn.query(sql, [ params.id,params.name,params.jobname,params.sex,params.phone,params.education,params.profession,params.email,params.skills,params.project,params.releasetime],function(err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'投递成功'}));
		}
	})
})
//获取应聘者信息
router.get('/getResume',(req,res) => {
	var sql = $sql.user.getResume;
	conn.query(sql,function(err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//安排面试
router.post('/interviewArrange',(req,res) => {
	var sql = $sql.user.addInterview;
	var params = req.body;
	conn.query(sql,[ params.id,params.name,params.email,params.phone,params.interviewer,params.date,params.time,params.status,params.pass ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'安排成功'}));
		}
	})
})
//录入人才库
router.post('/passInterview',(req,res) => {
	var sql = $sql.user.passInterview;
	var sql1 = $sql.user.updateInterview;
	var params = req.body;
	conn.query(sql,[ params.name,params.phone,params.email,params.id ],function (err) {
		if(err){
			throw err;
		}else{
			conn.query(sql1, ['通过','已经录入',params.id],function(err) {
				if(err){
					throw err;
				}else{
					res.end(JSON.stringify({status:'100',msg:'录入成功'}));
				}
			})
		}
	});
})
//获取人才库信息
router.get('/getTalent',(req,res) => {
	var sql = $sql.user.getTalent;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//获取所有面试安排
router.get('/getInterview',(req,res) => {
	var sql = $sql.user.getInterview;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//添加新员工
router.post('/addNewStaff',(req,res) => {
	var sql = $sql.user.addNewStaff;
	var params = req.body;
	conn.query(sql,[ params.id,params.name,params.sex,params.birth,params.education,params.profession,params.address,params.duties,params.salary,params.checkin,params.depart,params.status,params.phone ],function(err,result){
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'添加成功'}));
		}
	})
})
//用户账户密码信息
router.get('/allUser',(req,res) => {
	var sql = $sql.user.userInfo;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//修改用户密码
router.post('/changePs',(req,res) => {
	var sql = $sql.user.changePs;
	var params = req.body;
	conn.query(sql,[params.second_new_ps,params.name],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'修改成功'}));
		}
	})
})
//修改员工密码
router.post('/changeStaffPs',(req,res) => {
	var sql = $sql.user.changeStaffPs;
	var params = req.body;
	conn.query(sql,[params.second_new_ps,params.name],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'修改成功'}));
		}
	})
})
//获取培训信息
router.get('/trainInfo',(req,res) => {
	var sql = $sql.user.trainInfo;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//添加培训信息
router.post('/addTrainInfo',(req,res) => {
	var sql = $sql.user.addTrainInfo;
	var params = req.body;
	conn.query(sql,[ params.topic,params.staff,params.date,params.time,params.place,params.content],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'发布成功'}));
		}
	})
})
//获取个人信息
router.post('/personalDetail',(req,res) => {
	var sql = $sql.user.personalDetail;
	var params = req.body;
	conn.query(sql,[params.idnumber],function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//保存个人培训信息
router.post('/personalTrain',(req,res) => {
	var sql = $sql.user.personalTrain;
	var params = req.body;
	conn.query(sql,[ params.topic,params.name,params.sex,params.depart,params.duties,params.date,params.content,params.experience,params.idnumber],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'发布成功'}));
		}
	})
})
//获取个人培训信息
router.post('/getPersonalT',(req,res) => {
	var sql = $sql.user.getPersonalT;
	var params = req.body;
	conn.query(sql,[ params.idnumber ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//所有员工培训信息
router.get('/getAllTrainInfo',(req,res) => {
	var sql = $sql.user.getAllTrainInfo;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//打卡
router.post('/checkinAM',(req,res) => {
	var sql = $sql.user.checkinAM;
	var params = req.body;
	conn.query(sql,[ params.idnumber,params.info,params.time,params.date ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'打卡成功'}));
		}
	})
})
router.post('/checkinPM',(req,res) => {
	var sql = $sql.user.checkinPM;
	var params = req.body;
	conn.query(sql,[ params.idnumber,params.info,params.time,params.date ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'打卡成功'}));
		}
	})
})
//假条
router.post('/qingjia',(req,res) => {
	var sql = $sql.user.qingjia;
	var params = req.body;
	conn.query(sql,[ params.idnumber,params.name,params.leavedate,params.rebackdate,params.reason,params.status,params.releasetime ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'请假成功'}));
		}
	})
})
//个人请假信息
router.post('/mynote',(req,res) => {
	var sql = $sql.user.mynote;
	var params = req.body;
	conn.query(sql,[ params.idnumber ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//所有假条
router.get('/allnote',(req,res) => {
	var sql = $sql.user.allnote;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//个人考勤查询
router.post('/mycheckAM',(req,res) => {
	var sql = $sql.user.mycheckAM;
	var params = req.body;
	conn.query(sql,[ params.idnumber ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
router.post('/mycheckPM',(req,res) => {
	var sql = $sql.user.mycheckPM;
	var params = req.body;
	conn.query(sql,[ params.idnumber ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//请假通过
router.post('/passnote',(req,res) => {
	var sql = $sql.user.passnote;
	var params = req.body;
	conn.query(sql,[ params.status,params.id ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'批准成功'}));
		}
	})
})
router.post('/notpassnote',(req,res) => {
	var sql = $sql.user.notpassnote;
	var params = req.body;
	conn.query(sql,[ params.status,params.backreason,params.id ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'驳回成功'}));
		}
	})
})
//员工考勤
router.get('/allcheckAM',(req,res) => {
	var sql = $sql.user.allcheckAM;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
router.get('/allcheckPM',(req,res) => {
	var sql = $sql.user.allcheckPM;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//所有岗位信息
router.get('/allwork',(req,res) => {
	var sql = $sql.user.allwork;
	conn.query(sql,function (err,result) {
		if(err){
			throw err;
		}else{
			res.json(result);
		}
	})
})
//调整岗位信息
router.post('/changeSM',(req,res) => {
	var sql = $sql.user.changeSM;
	var params = req.body;
	conn.query(sql,[ params.workname,params.depart,params.salary,params.id ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'调整岗位信息成功'}));
		}
	})
})
//添加新岗位
router.post('/addNewWork',(req,res) => {
	var sql = $sql.user.addNewWork;
	var params = req.body;
	conn.query(sql,[ params.workname,params.depart,params.salary ],function (err,result) {
		if(err){
			throw err;
		}else{
			res.end(JSON.stringify({status:'100',msg:'添加岗位成功'}));
		}
	})
})

module.exports = router;