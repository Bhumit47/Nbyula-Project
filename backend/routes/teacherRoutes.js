import express from 'express'
const router = express.Router()
import {
  authUser,
  addTeacher
} from '../controller/teacherController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(addTeacher)
//.get(protect, admin, getTeacher)
router.post('/login', authUser)

export default router
