const graphql = require('graphql');
const _ = require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const User = require('../models/user');
const Todo = require('../models/todo');

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        priority: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.id);
            }
        }
    })
});

// const TaskType = new GraphQLObjectType({
//     name: 'Task',
//     fields: () => ({
//         id: { type: GraphQLString },
//         name: { type: GraphQLString },
//         type: { type: GraphQLString },
//         priority: { type: GraphQLString }
//     })
// });

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        data: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // return _.find(todos, { id: args.id });
                return Todo.findById(args.id);
            }
        },
        // task: {
        //     type: TaskType,
        //     args: { id: { type: GraphQLID }},
        //     resolve(parent, args) {
        //         // return _.find(tasks, { id: args.id });
        //     }
        // },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
            //    return _.find(users, { id: args.id }); 
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // return users
                return User.find({});
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args){
                // return todos
                return Todo.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
                priority: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let todo = new Todo ({
                    name: args.name,
                    type: args.type,
                    priority: args.priority
                });
                return todo.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
                data: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    type: args.type,
                    data: args.data
                });
                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});