const UsersDAO = require('../dao/usersDAO');
const { static } = require('express');

const hashPassword = async password => await bcrypt.hash(password, 10);
//const SecretKey = 'lskdjfoijoi234lk234mndfg908d';
const SecretKey = process.env.SECRET_KEY;




class User {
        constructor( { name, email, password} = {}) {
            this.name = name
            this.email = email
            this.password = password
        }
        toJson() {
            return { name: this.name, email: this.email }
        }
        async comparePassword(plainText) {
            return await bcrypt.compare(plainText, this.password)
        }
        encoded() {
            return jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                    ...this.toJson()
                },
               SecretKey
            )
        }
        static async decoded(userJwt) {
            return jwt.verify(userJwt, SecretKey, (error, res) => {
                if (error) {
                    return { error }
                }
                return new User(res)
            })
        }
    }

module.exports = 
    class UserController {
        static async addGoogleUser(googleUser) {
            try {
                console.log(`controller trying to add ${googleUser.displayName}`)
                let newUser = await UsersDAO.addUser(googleUser)
                return newUser;
            } catch(e) {
                console.log('error: ' + e)
            }
        }
        static async findGoogleUser(googleId) {
            try {
                //console.log(`controller trying to find userwith id: ${googleId}`)
                return await UsersDAO.findUser(googleId)

            } catch (err) {
                console.log('error: ' + e)
            }
       
       
        }
    }

module.exports.User = User;
