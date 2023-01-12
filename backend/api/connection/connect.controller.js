const {
    connect,
    getMeetFromStudentId,
    getMeetFromMentorId,
  } = require("./connect.service");
  
  module.exports = {
    createConnection: (req, res) => {
      const body = req.body;
      connect(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getMeetFromStudentId: (req, res) => {
      const id = req.params.id;
      getMeetFromStudentId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getMeetFromMentorId: (req, res) => {
      const id = req.params.id;
      getMeetFromMentorId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
  };