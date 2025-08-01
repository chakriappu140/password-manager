import express from "express";
import {
  savePassword,
  getPasswords,
  deletePassword,
  updatePassword, // ✅ import update controller
} from "../controllers/passwordController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

router.route("/")
  .get(getPasswords)
  .post(savePassword);

// ✅ Add the missing PUT route
router.route("/:id")
  .put(updatePassword) 
  .delete(deletePassword);

export default router;
