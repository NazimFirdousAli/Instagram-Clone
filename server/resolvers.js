
const { saveImage } = require('./saveFile');


const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient();

// import { FileUpload } from 'graphql-upload'

const { APP_SECRET, getUserID } = require('./utils.js')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path')
const fs = require('fs');
const { info } = require('console');

const { existsSync, mkdirSync, unlinkSync, createWriteStream } = require('fs');

module.exports = {
    Query: {
        users: async () => prisma.user.findMany(),
        // allPosts: async () => prisma.post.findMany(),
        userPosts: async (root, args, context, info) => {
            const user = await getUserID(context)
            // console.log(user.id)
            const allpost = await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })
            return allpost
        },
        loggedInUser: async (root, args, context, info) => {
            return getUserID(context)
        }

    },
    Mutation: {
        signUp: async (root, { password, avatar, ...data }, context, info) => {
            const isEmailExists = await prisma.user.findUnique({ where: { email: data.email } });
            if (isEmailExists) throw new Error('Email is already taken...');

            const hashPassword = bcrypt.hashSync(password, 10)
            data.password = hashPassword;
            
            if (avatar && typeof avatar === 'object') {
                data.avatar = await saveImage(avatar);
              }
            
            // data.avatar = await new Promise((resolve, reject) => {
            //     return avatar.then(({ createReadStream, ...rest }) => {
            //         const id = Math.random().toString(32).substr(7);
            //         const filename = `${id}-${rest.filename}`;
            //         if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
            //         createReadStream()
            //             .pipe(fs.createWriteStream(path.join('./uploads', filename)))
            //             .on('error', (error) => reject(new Error(error.message)))
            //             .on('finish', () => resolve(filename));
            //     })
            // })

            // console.log('after', data.avatar);

            const createUser = await prisma.user.create({ data })

            const token = jwt.sign({ userId: createUser.id }, APP_SECRET);

            return {
                token,
                user: createUser
            }
        },
        Login: async (root, { ...data }, context, info) => {
            const findUser = await prisma.user.findUnique({
                where: { email: data.email }
            })
            if (!findUser) {
                throw new Error("User not Found")
            }
            const checkPassword = await bcrypt.compareSync(data.password, findUser.password)
            if (!checkPassword) {
                throw new Error("Password Not Match")
            }
            const token = jwt.sign({ userId: findUser.id }, APP_SECRET, { expiresIn: '1m' });
            return {
                token,
                user: findUser
            }
        },
        createPost: async (root, { picture, ...data }, context, info) => {
            const user = await getUserID(context)

            data.picture = await new Promise((resolve, reject) => {
                return picture.then(({ createReadStream, ...rest }) => {
                    const id = Math.random().toString(32).substr(7);
                    const filename = `${id}-${rest.filename}`;
                    if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
                    createReadStream()
                        .pipe(fs.createWriteStream(path.join('./uploads', filename)))
                        .on('error', (error) => reject(new Error(error.message)))
                        .on('finish', () => resolve(filename));
                })
            })

            data.user = {
                connect: {
                    id: user.id
                }
            }
            return prisma.post.create({ data })
        },

        updateDetails: async (root, { avatar, ...data }, context, info) => {
            // ...data: [name, email, phonenumber]
            const user = await getUserID(context)
            // data.avatar = await saveImage(data.avatar, user.avatar)
            const isEmailDuplicate = await prisma.user.findFirst({
                where: { email: data.email, NOT: { id: user.id } }
            })
            if (isEmailDuplicate) throw new Error('Email already exists')

            if (avatar && typeof avatar === 'object') {
                data.avatar = await saveImage(avatar, user.avatar || false);
            }


            const updateData = await prisma.user.update({
                where: { id: user.id },
                data
            })

            return updateData
        },
        createComment: async (root, { postId, ...data }, context, info) => {
            const user = await getUserID(context);
            const post = await prisma.post.findUnique({ where: { id: postId } });
            data.postId = post.id
            data.userId = user.id
            console.log(data, postId, userId)

            return prisma.comment.create({ data })
        },

        followingUser:async(root,data,context,info) => {
            const user = await getUserID(context);
            data.userId = user.id
            return prisma.following.create({data})
        }
    },

    User: {
        posts: async (root, args, context, info) => {
            return prisma.post.findMany({ where: { userId: root.id } })
        }
    },
    Post: {
        user: async (root, args, context, info) => {
            return prisma.user.findUnique({ where: { id: root.userId } })
        }
    }
}