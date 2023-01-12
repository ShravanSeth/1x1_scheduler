const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  getUsersFromAOE,
  updateUsers,
  deleteUser
} = require("./mentor.controller");
router.get("/", checkToken, getUsers);
router.get("/?area=:area",checkToken, getUsersFromAOE);
router.post("/", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/",checkToken,  deleteUser);

module.exports = router;