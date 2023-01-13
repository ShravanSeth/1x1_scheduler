const pool = require("../../config/database");

module.exports = {
  connect: (data, callBack) => {
    pool.query(
      `insert into connect(studentId, mentorId, timeSlot, date, day, duration)
        values(?,?,?,?,?,?)`,
      [
        data.student_id,
        data.mentor_id,
        data.timeSlot,
        data.date,
        data.day,
        data.duration,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMeetFromStudentId: (studentId, callBack) => {
    pool.query(
      `select * from connect where studentId = ?`,
      [studentId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getMeetFromMentorId: (mentorId, callBack) => {
    pool.query(
      `select * from connect where mentorId = ?`,
      [mentorId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
