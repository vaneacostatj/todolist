'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "task"

const taskSchema = Schema({
  _id : String,
  taskListId : String,
  userId : String,
  name : String,
  description : String,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}, 
  isRemove: {type: Boolean, default: false}, 
}, {
  collection: collectionName,
  _id: false
})


module.exports = model(collectionName, taskSchema); 