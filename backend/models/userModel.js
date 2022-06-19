import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const historySchema=mongoose.Schema({
  module_name:{
    type:String
  },
  correct:{
    type:Number
  },
  total:{
    type:Number
  },
  date:{
    type:Date,
    default:Date.now()
  }
})

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isTeacher:{
      type:Boolean
    },
    history:[historySchema]
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
