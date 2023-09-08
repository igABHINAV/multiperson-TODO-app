const ecpress = require("express");
const { signup, login } = require("../controllers/User_controller");
const router = ecpress.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;