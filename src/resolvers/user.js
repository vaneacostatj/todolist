'use strict'
const user = require('../models/user');
const { generateId, handlePagination } = require('@codecraftkit/utils');
const RandomNumber = () => Math.floor(Math.random()*50)
//es una data virtual (simulador de db)
const gender = {
  "1":{
    _id: "1",
    name: 'men'
  },
  "2":{
    _id: "2",
    name: 'women'
  }
}

const User_get = async (_, {filter={}, options={}}) =>{
  try {
    let query = { isRemove: false }
    let { _id, firstName, lastName} = filter
    let {skip, limit} = handlePagination(options)
    
    if(_id) query._id = _id 
    if(firstName) query.firstName = { $regex: firstName, $options: 'i' }
    if(lastName) query.lastName = { $regex: lastName, $options: 'i' }
    const find = user.find(query) 
    //console.log(query, skip, limit);

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await find.lean()
    //console.log(results);
    //console.log(find, "termina");

    //implementación del simulador de db 
    for (let result of results){
      result.gender = gender[result.genderId]
      //console.log("entro jojo");
    }
    //console.log(results, "oie");

    return results

  } catch (error) {
    console.error(`se crea error en User_get ${error}`);
    return error
  }
}

//------------- contador de elementos --------------
// según la tabla se basa en el get
const User_count = async (_, {filter={}}) =>{
  try {
    const count = await User_get(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const User_delete = async (_, {_id}) => {
  try {
      await user.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    console.error(`se crea error en User_delete ${error}`);
    return error
  }
}

const User_save = async(_,{userInput})=>{
  try {
    if(userInput._id){
      return await User_update(_,{userInput})
    }
    else{
      return await User_add(_,{userInput})
    }
  } catch (error) {
    return error
  }
}

const User_update = async (_, {userInput}) => {
  try {
      await user.findByIdAndUpdate(userInput._id, {
      $set: userInput
    }, {new: true})
    return userInput._id
  } catch (error) {
    console.error(`se crea error en User_update ${error}`);
    return error
  }
}

const User_add = async (_, args) => {

  try {
    const ID = generateId()
    const { firstName, lastName, email, genderId } = args.userInput

    //verificador del genero
    const gen = gender[genderId]
    const avatar = `https://randomuser.me/api/portraits/${gen.name}/${RandomNumber()}.jpg`
    
    new user ({_id:ID, firstName, lastName, email, genderId, avatar }).save()

    return ID

  } catch (error) {
    console.error(`se crea error en User_add ${error}`);
    return error
  }
}

const User_gender = () => {

  return Object.values(gender)
}

module.exports = {

  Query: {
    User_get,
    User_gender,
    User_count
  },

  Mutation:{
    User_save,
    User_delete,
  }
}
