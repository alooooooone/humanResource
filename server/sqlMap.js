// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'INSERT INTO user(id, username, password) VALUES (0, ?, ?)',
        check: 'SELECT * FROM user WHERE username = ? AND password = ?',
        exist: 'SELECT * FROM user WHERE username = ?',
        staffInfo: 'SELECT * FROM staffInfo',
        lookfor: 'SELECT * FROM staffInfo WHERE id = ?',
        updateStaff: 'UPDATE staffInfo SET name=?,sex=?,birth=?,education=?,profession=?,address=?,duties=?,salary=?,checkin=?,depart=?,status=?,phone=? WHERE id = ?',
    	hrInfo: 'SELECT * FROM hrInfo',
    	updateHrInfo: 'UPDATE hrInfo SET jobaddress=?,education=?,workyears=?,jobdescription=?,jobrequirements=?,releasetime=? WHERE id=?',
		addHireInfo: 'INSERT INTO hrInfo(id,jobname,jobkind,jobtype,jobaddress,jobquantity,releasetime,education,workyears,jobdescription,jobrequirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    	deliverResume: 'INSERT INTO resume( id,name,jobname,sex,phone,education,profession,email,skills,project,releasetime) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
    	getResume: 'SELECT * FROM resume',
        searchName: 'SELECT * FROM staffInfo WHERE name = ?',
        searchDuties: 'SELECT * FROM staffInfo WHERE duties = ?',
        searchDepart: 'SELECT * FROM staffInfo WHERE depart = ?',
        searchInfo: 'SELECT * FROM staffInfo WHERE name = ? OR duties = ? OR depart = ?',
        deleteHireInfo: 'DELETE FROM hrInfo WHERE id = ?',
        deleteStaff: 'DELETE FROM staffInfo WHERE id = ?',
        addNewStaff: 'INSERT INTO staffInfo(id,name,sex,birth,education,profession,address,duties,salary,checkin,depart,status,phone) VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,? )',
        userInfo: 'SELECT * FROM user',
        changePs: 'UPDATE user SET password=? WHERE username=?'
    }
}

module.exports = sqlMap;