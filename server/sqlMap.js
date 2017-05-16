// sql语句
var sqlMap = {
    // 用户
    user: {
        addManager: 'INSERT INTO manager(id, username, password) VALUES (0, ?, ?)',
        addStaff: 'INSERT INTO staff(id, username, password) VALUES (0, ?, ?)',
        check: 'SELECT * FROM manager WHERE username = ? AND password = ?',
        exist: 'SELECT * FROM manager WHERE username = ?',
        existStaff: 'SELECT * FROM staff WHERE username = ?',
        checkStaff: 'SELECT * FROM staff WHERE username = ? AND password = ?',
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
        changePs: 'UPDATE user SET password=? WHERE username=?',
        addInterview: 'INSERT INTO interview(id,name,email,phone,interviewer,date,time,status,pass) VALUES(?,?,?,?,?,?,?,?,?)',
        getInterview: 'SELECT * FROM interview',
        passInterview: 'INSERT INTO talent(name,phone,email,id) VALUES(?,?,?,?)',
        updateInterview: 'UPDATE interview SET status=?,pass=? WHERE id = ?',
        getTalent: 'SELECT * FROM talent',
        trainInfo: 'SELECT * FROM trainInfo',
        addTrainInfo: 'INSERT INTO trainInfo(topic,staff,date,time,place,content,id) VALUES (?,?,?,?,?,?,0)'
    }
}

module.exports = sqlMap;