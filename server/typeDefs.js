const { gql } = require('apollo-server-express');


module.exports = gql`

    type User{
        id:Int!
        name:String!
        email:String!
        password:String!
        phonenumber:String!
        gender:Gender
        avatar:String
        dateofbirth:String
        posts:[Post!]!
    }

    type Post{
        id:Int!
        picture:String
        content:String!
        user:User
    }

    enum Gender {
        Male
        Female
    }
    type Authpayload{
        token:String!
        user:User
    }

    type Query {
        users:[User]
        userPosts: User!
        loggedInUser: User!
        # allPosts: User!

    }
    type Mutation {
        signUp(name:String!,email:String!,password:String!,phonenumber:String!,gender:String,avatar:Upload ,dateofbirth:String):Authpayload!
        Login(email:String!, password:String!):Authpayload!
        createPost(picture:Upload!, content:String!):Post!    }
    type Subscription {
        _: Boolean
    }
`;