import express from "express";
import { signup, login } from "../controllers/authController";
const router = express.Router();
import validationMiddleware from '../middleware/validationMiddleware';
import { validateLogin, validateUser } from "../utils/validations";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", [validationMiddleware(validateUser)], signup);
router.post("/login", [validationMiddleware(validateLogin)], login);

export default router;
