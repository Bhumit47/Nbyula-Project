import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Teachers from '../models/teachersModel.js'

dotenv.config()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  })
}

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
  const authUser = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body
  
    const user = await Teachers.findOne({ email })
    console.log(user)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

  // @desc    Add teacher
// @route   POST /api/teacher
// @access  Public

 const addTeacher=asyncHandler(async (req, res) => {
  const { name,email, password } = req.body

  const userExists = await Teachers.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const teacher = await Teachers.create({
    name,
    email,
    password,
  })
   teacher.isAdmin=true;
  await teacher.save()

  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      email: teacher.email,
      token: generateToken(teacher._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

  export {
    authUser,
    addTeacher
  }