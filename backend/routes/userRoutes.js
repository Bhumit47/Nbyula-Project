import express from 'express'
const router = express.Router()
import {
  authUser,
  addUser
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(addUser)
//.get(protect, admin, getTeacher)
router.post('/login', authUser)

export default router
