const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into mentor(firstName, lastName, gender, email, password, areaOfInterest, workExperience) 
                values(?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.area_of_interest,
        data.work_experience
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from mentor where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,areaOfInterest,workExperience from mentor where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,gender,email,areaOfInterest,workExperience from mentor`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAOE:callBack => {
    pool.query(
      `select distinct(areaOfInterest) from mentor`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsersFromAOE: (area_of_interest, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,areaOfInterest,workExperience from mentor where areaOfInterest = ?`,
      [area_of_interest],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSlot: (area_of_interest, callBack) => {
    pool.query(
      `  select  mentorId, timeSlot, duration from connect inner join mentor on mentor.areaOfInterest = ? and connect.mentorId = mentor.id where date>= CURDATE() and timeSlot>=CURRENT_TIME()`,
      [area_of_interest],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update mentor set firstName=?, lastName=?, gender=?, email=?, password=? ,areaOfInterest =? ,workExperience=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.area_of_interest,
        data.work_experience,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from mentor where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
