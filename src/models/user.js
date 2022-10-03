'use strict'
const { Schema, model } = require('mongoose');

const collectionName = 'user';

const userShema = Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,  
  avatar: String,
  genderId: String,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}, 
  isRemove: {type: Boolean, default: false},
},{
  collection: collectionName,
  _id: false
})

module.exports = model(collectionName, userShema);