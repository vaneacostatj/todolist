'use strict'
const { GraphQLDateTime } = require('graphql-iso-date')
const { gql } = require ('apollo-server-express');
 

const taskShema = gql`
scalar GraphQLDateTime

  type Task {
    _id: String,
    taskListId: String,
    userId: String,
    name: String,
    description: String,
    taskList: TaskList,
    user: User,
    isRemove: Boolean,
    createdAt: GraphQLDateTime
  } 

  input Task_filter{
    _id: String
    taskListId: String
    name: String
  }

  input TaskInput{
    _id: String
    taskListId: String
    name: String
    description: String
    userId: String
  }
  input Option{
    limit:Int
    page: Int
  }

  type Query{
    Task_get(filter:Task_filter, options:Option ): [Task]
    ToDoList_get(taskListId: String):[Task]
    Task_count(filter: Task_filter): Int
  }
  type Mutation{
    Task_save(taskInput: TaskInput): ID
    Task_delete(_id: String!): String
  }
`

module.exports = taskShema;