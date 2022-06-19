import express from 'express'
const router = express.Router()
import {
  addMcq,
  addModule,
  getModules,
} from '../controller/moduleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect,admin,addModule).get(protect, admin, getModules)
router.route('/addMcq').post(protect,admin,addMcq)

export default router
