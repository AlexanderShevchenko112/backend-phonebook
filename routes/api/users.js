const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/userControllers");
const { validateSignup, validateLogin } = require("../../middlewares/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", validateSignup, ctrl.signup);
router.post("/login", validateLogin, ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.current);
router.patch("/avatar", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
