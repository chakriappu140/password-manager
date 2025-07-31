import express from "express"
import {savePassword, getPasswords} from "../controllers/passwordController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', protect, savePassword)
router.get('/', protect, getPasswords)

export default router