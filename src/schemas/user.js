'use strict'
const { gql } = require ('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date')
 

const userShema = gql`
  scalar JSONObject
  scalar GraphQLDateTime
  
  type User {
    _id: String
    firstName: String
    lastName: String
    email: String   
    gender: User_gender 
    genderId: String
    createdAt: GraphQLDateTime 
    isRemove: Boolean
    avatar: String
  } 

  type User_gender{
    _id: String
    name: String
  }

  input User_filter{
    _id: String
    firstName: String
    lastName: String
  }

  input Option{
    limit:Int
    page: Int
  }

  input UserInput {
    _id: String
    firstName: String
    lastName: String
    email: String   
    genderId: String!
  }
 
  type Query {
    User_get(filter:User_filter, options: Option):[User]
    User_gender: [User_gender]
    User_count(filter: User_filter): Int
  }

  type Mutation {
    User_save(userInput: UserInput): ID
    User_delete(_id:String!): String
  }

`
module.exports = userShema;