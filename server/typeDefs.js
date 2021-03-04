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
        followers:[Followers!]!
        following:[Following!]!


    }

    type Post{
        id:Int!
        picture:String
        content:String!
        user:User
        Comment:[Comment!]!
    }
    type Comment{
        id:Int!
        content:String!
        post:Post!
        user:User!
    }

    type Followers{
        id:Int!
        user:User!
    }

    
    type Following{
        id:Int!
        user:User!
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
        createPost(picture:Upload!, content:String!):Post!
        updateDetails(name:String!,email:String!,phonenumber:String!,avatar:Upload):User!
        updatePassword(password:String!):User!

        createComment(postId:Int! content:String!):Post!

        followingUser(userId:Int):User!

        }
    type Subscription {
        _: Boolean
    }
`;