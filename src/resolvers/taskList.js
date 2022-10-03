'use strict'
/* crud lista de tareas */
const { generateId, handlePagination } = require('@codecraftkit/utils');
const taskList = require('../models/taskList')


const TaskList_get = async (_, {filter={}, options={}}) => {
  
 try {
    let query = { isRemove: false }
    let { _id, name} = filter
    let {skip, limit} = handlePagination(options)

    if(_id) query._id = _id 
    if(name) query.name = { $regex: name, $options: 'i' }
    const find = taskList.find(query) 

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await find.lean()
    return await results    

  } catch (error) {
    console.error(`se crea error en getTaskList = ${error}`);
    return error;
  }
}

const TaskList_count = async (_, {filter={}})=>{
  try {
    const count = await TaskList_get(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const TaskList_add = async (_, args) => {
  try {
    const { name } = args.taskListInput
    let query = { isRemove: false }
    if(name) query.name = { $regex: name, $options: 'i' }

    let valid = await taskList.find(query) 
    let result = valid.length
   // console.log(result)

    if(result != 0){
      return ('list name already exists')
    } else{
      const ID = generateId()    
      new taskList ({_id:ID,name}).save()
      return ID
    }    
  } catch (error) {
    console.error(`se crea error en addTaskList = ${error}`);
    return (`se crea error en addTaskList = ${error}`);
  }
}

const TaskList_save = async (_, {taskListInput}) =>{
  try {
    if(taskListInput._id){
      return await TaskList_update(_,{taskListInput})
    }
    else{
      return await TaskList_add(_,{taskListInput})
    }
  } catch (error) {
    return error
  }
}

const TaskList_update = async (_, {taskListInput}) => {
 try {
   await taskList.findByIdAndUpdate(taskListInput._id, { $set: taskListInput}, {new: true})
   return taskListInput._id
 } catch (error) {
    console.error(`se crea error en updateTaskList = ${error}`);
    return (`se crea error en updateTaskList = ${error}`);
 }
}

const TaskList_delete = async (_, {_id}) => {
  try {
    await taskList.findByIdAndUpdate(_id, { $set: { isRemove: true }
  })
    return true
  } catch (error) {
    console.error(`se crea error en deleteTaskList ${error}`);
    return (`se crea error en deleteTaskList ${error}`);
  }  
}

module.exports = {
  Query:{
    TaskList_get,
    TaskList_count
  },

  Mutation:{
    TaskList_save,
    TaskList_delete
  }
}