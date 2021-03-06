let users 
let sessions

module.exports = class UsersDao {
    static async injectDB(conn) {
        if (users && sessions) {
            return
        }
        try {
            console.log('injecting db..')
            users = await conn.db('postsOauth').collection('users')
            //sessions = await conn.db('posts').collection('sessions')
        } catch (e) {
            console.error(`Unable to establish collection handles in userDao: ${e}`)
        }
    }

    static async addUser(googleUser) {
        try {
            let { googleId, displayName} = googleUser;
            let addResult = await users.insertOne({ displayName: displayName, googleId: googleId }, { w: 'majority' })
            if(addResult.insertedId) {
                return googleUser;
            }
            return { error: "Failed to insert new user."};
        } catch (e) {
            if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
                return { error: "A user with the given email already exists." }
            } 
            console.error(`Error occured while adding new user, ${e}`)
            return { error: e }            
        }
    }
    static async findUser(googleId) {
        try {
            let res = await users.findOne({googleId: googleId})
            return(res)
        } catch (err) {
            console.error(err)
        }
    }



    /*
    static async getUser(email) {
        return await users.findOne({ email: email })
    }

    static async addUser(userInfo) {
        try {
            let {name, email, password} = userInfo
            await users.insertOne({ name: name, email: email, password: password}, { w: 'majority' })
            return { success: true }
        } catch (e) {
            if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
                return { error: "A user with the given email already exists." }
            }
            console.error(`Error occured while adding new user, ${e}`)
            return { error: e }
        }
    }

    static async checkEmail(email) {
        try {
            const emailResult = await users.find({email: email}).toArray()
            if (emailResult.length > 0) {
                return 1
            }
            else {
                return 0
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async loginUser(email, jwt) {
        try {
            await sessions.updateOne(
                { user_id: email },
                { $set: { jwt: jwt } },
                {upsert: true}
            )
            return { success: true }
        } catch (e) {
            console.error(`Error occured while logging in user: ${e}`)
            return { error: e }
        }
    }
    static async logoutUser(email) {
        try {
            await sessions.deleteOne({ user_id: email })
            return { succes: true }
        } catch (e) {
            console.error(`Error occured while logging out user ${e}`)
            return { error: e }
        }
    }
    static async checkLoginStatus(userJwt) {
        try {
            const isLoggedIn = await sessions.findOne({jwt: userJwt})
            console.log(isLoggedIn)
            if (isLoggedIn === null) {
                return false
            }
            return true
        } catch (e) {
            console.log(e)
        }
    }

    */
}