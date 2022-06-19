import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

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
  
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        isTeacher:user.isTeacher,
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

 const addUser=asyncHandler(async (req, res) => {
  const { name,email, password,isTeacher } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  
  if(isTeacher){
        var a=email
       if(a.substring(a.length-25,a.length)!='chitkarauniversity.edu.in')
       throw new Error('Email must end with `chitkarauniversity.edu.in` for a teacher')
  }

  const user = await User.create({
    name,
    email,
    password,
    isTeacher
  })
  await user.save()

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isTeacher:user.isTeacher,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

  export {
    authUser,
    addUser
  }