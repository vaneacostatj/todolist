'use strict'
const { gql } = require ('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date')

const taskListShema = gql`
  scalar GraphQLDateTime

  type TaskList{
    _id: String,
    createdAt: GraphQLDateTime,
    name: String,
    isRemove: Boolean
  }

  input TaskListInput{
    _id: String
    name: String
  }

  input TaskList_filter{
    _id: String, 
    name: String
  }

  input Option{
    limit:Int
    page: Int
  }

  type Query{
    TaskList_get(filter:TaskList_filter ): [TaskList]
    TaskList_count(filter: TaskList_filter): Int
  }

  type Mutation{
    TaskList_save(taskListInput: TaskListInput): ID
    TaskList_delete(_id: String!): String
  }
`
module.exports = taskListShema