'use strict'
const task = require('../models/task');
const { generateId, handlePagination } = require('@codecraftkit/utils')

 
const Task_get = async (_, {filter={}, options={}}) => {
 
  try {
    let query = { isRemove: false }
    let {_id, taskListId, name} = filter
    let {skip, limit} = handlePagination(options)
    

    if(_id) query._id = _id 
    if(name) query.name = { $regex: name, $options: 'i' }
    if(taskListId) query.taskListId = taskListId
    const find = task.find(query) 

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await find.lean()
    //console.log(results);
    return results
    
  } catch (error) {
    console.error(`se crea error en Task_get ${error}`);
    return error;
  } 
}

const Task_count = async (_, {filter={}}) =>{
  try {
    const count = await Task_get(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const Task_delete = async (_, {_id}) => {
  try {
      await task.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    console.error(`se crea error en Task_delete ${error}`);
    return error;
  }
}

const Task_save = async(_,{taskInput}) => {
  try {
    if(taskInput._id){
      return await Task_update (_,{taskInput})
    }
    else{
      return await Task_create(_,{taskInput})
    }    
  } catch (error) {
    return error
  }
}

const Task_update = async (_, {taskInput}) => {
  try {
     await task.findByIdAndUpdate(taskInput._id, {
      $set: taskInput
    }, {new: true})
    return taskInput._id
  } catch (error) {
    console.error(`se crea error en Task_update ${error}`);
    return error;
  }
}

const Task_create = async (_, args) => {
  try {
    const ID = generateId()
    const { name, taskListId, description, assignedUser } = args.taskInput
    new task ({_id:ID,  name, taskListId, description, assignedUser}).save()
    return ID
  } catch (error) {
    console.error(`se crea error en createTask ${error}`);
    return error;
  }
}



/* join */
const ToDoList_get = async (_, args) => {
  try {
    return await task.aggregate([
      {
        $match:{
          isRemove: false
        }
      },
      {
        $match:{
          taskListId: args.taskListId
        }
      },
      {
        $lookup : {
          from : "taskList",
          localField : "taskListId",
          foreignField : "_id",
          as : "taskList"
        }
      },
      {
        $unwind: {
          path:"$taskList",           
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup : {
          from : "user",
          localField : "assignedUser",
          foreignField : "_id",
          as : "user"
        }
      },
      {
        $unwind: {
          path:"$user",           
          preserveNullAndEmptyArrays: true
        }
      }
    ])   
      
  } catch (error) {
    console.error(`se crea error en getToDoList ${error}`);
    return error;
  }
}




module.exports = {
  Query: {
    Task_get,
    ToDoList_get,
    Task_count
  },

  Mutation: {
    Task_delete,
    Task_save
  }
}