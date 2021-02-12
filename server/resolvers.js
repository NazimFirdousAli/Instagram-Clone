const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// import { FileUpload } from 'graphql-upload'

const { APP_SECRET } = require('./utils.js')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path')
const fs = require('fs')

module.exports = {
    Query: {
        users: async () => { return await prisma.user.findMany() },

    },
    Mutation: {
        Signup: async (root, { password, avatar, ...data }, context, info) => {
            const isEmailExists = await prisma.user.findUnique({ where: { email: data.email } });
            if (isEmailExists) throw new Error('Email is already taken...');

            const hashPassword = bcrypt.hashSync(password, 10)
            data.password = hashPassword;

            console.log('avatar', avatar)

            // if (typeof avatar === 'object' && avatar) {
                data.avatar = await new Promise((resolve, reject) => {
                    return avatar.then(({ createReadStream, ...rest })=> {
                        const id = Math.random().toString(32).substr(7);
                        const filename = `${id}-${rest.filename}`;
                        if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
                        createReadStream()
                            .pipe(fs.createWriteStream(path.join('./uploads', filename)))
                            .on('error', (error) => reject(new Error(error.message)))
                            .on('finish', () => resolve(filename));
                    })
                })
            // }

            console.log('after', data.avatar);

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
            const token = jwt.sign({ userId: findUser.id }, APP_SECRET);
            return {
                token,
                user: findUser
            }
        },
        Post: async (root, { ...data }, context, info) => {

        }
    }
}