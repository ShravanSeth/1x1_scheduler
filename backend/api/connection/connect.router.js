const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createConnection,
  getMeetFromStudentId,
  getMeetFromMentorId,
} = require("./connect.controller");
router.post("/",checkToken, createConnection);
router.get("/?stid=:stid",checkToken,  getMeetFromStudentId);
router.get("/?mtid=:mtid",checkToken, getMeetFromMentorId);

module.exports = router;