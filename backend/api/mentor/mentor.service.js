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
