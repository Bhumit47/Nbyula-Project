import Module from '../models/moduleModel.js'
import asyncHandler from 'express-async-handler'
//add module
const addModule=asyncHandler(async (req, res) => {
        const {name}=req.body  
        const user=req.user;
        const module=new Module({
              teacher:user._id,
              name
          })
        const createdModule = await module.save()

    res.status(201).json(createdModule)
  })

//add MCQ

  const addMcq=asyncHandler(async (req, res) => {
    const {id,question,options,answer}=req.body  
    const user=req.user
    const module= await Module.findById(id);
    const mcq={
        question,
        options,
        answer
    }
    module.mcq.unshift(mcq)
    await module.save()
    res.json(module);
})

//get module

const getModules=asyncHandler(async (req, res) => {
  const modules= await Module.find({});
  res.json(modules);
})

export {
  addMcq,
  addModule,
  getModules
}
