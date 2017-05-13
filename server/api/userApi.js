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
    console.log(params);
    conn.query($sql.user.exist, [params.username], function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	if(result.length == 0){
        		conn.query($sql.user.add,[params.username,params.password],function (err,result) {
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
});
//检测账户登录信息
router.post('/checkUser', (req, res) => {
    var sql = $sql.user.check;
    var params = req.body;
    //console.log(params);
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
});
//获取员工信息
router.get('/staffInfo', (req, res) => {
    var sql = $sql.user.staffInfo;
    conn.query(sql, function(err, result) {
        if (err) {
            throw err;
        }else{
        		res.json(result);
        		//console.log(result);
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
	  	,params.checkin,params.depart,params.status,params.phone,params.id ],function (err,result) {
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

module.exports = router;