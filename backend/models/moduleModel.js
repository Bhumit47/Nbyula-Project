import mongoose from 'mongoose'

const mcqSchema=mongoose.Schema(
    {
        question:{
            type:String,
            required:true
        },
        options:[{
            type:String,
            required:true
        }],
        answer:{
            type:Number,
            required:true
        }
    }
)

const moduleSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    mcq:[mcqSchema]
}
)

const Module = mongoose.model('Module', moduleSchema)

export default Module
