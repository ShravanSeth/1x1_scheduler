const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  getUsersFromAOE,
  getAOE,
  getSlot,
  updateUsers,
  deleteUser
} = require("./mentor.controller");
router.get("/", getUsers);
router.post("/users",getUsersFromAOE);
router.post("/slot",getSlot);
router.get("/aoe", getAOE);
router.post("/", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/",checkToken,  deleteUser);

module.exports = router;