'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "taskList"

const taskListSchema = Schema({
  _id : String,
  name : String,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now},
  isRemove: {type: Boolean, default: false}, 
}, {
  collection: collectionName,
  _id : false
})


module.exports = model(collectionName, taskListSchema);