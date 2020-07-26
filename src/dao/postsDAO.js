mongodb = require('mongodb');

let userPosts

module.exports = {
    injectDB: async (client) => {
        if (userPosts) {
            return
        }
        try {
            console.log('injecting db')
            userPosts = await client.db("postsOauth").collection("userPosts");
        } catch(e) {
            console.log(`Error connecting to database: ${e}`)
        }
    },
    getUserPosts: (googleId) => (
        new Promise((resolve, reject) => {
            userPosts.find({googleId: googleId}, (err, data) => {
                err ? reject(err) : resolve(data.toArray())
            })        
        })
    ),
    addUserPost: (user, title) => (
        new Promise((resolve, reject) => {
            userPosts.insertOne({googleId: user, title: title, items: [{body: "Empty item", ticked: false}]}, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    ),
    removeUserPost: (user, _id) => (
        new Promise((resolve, reject) => {
            userPosts.deleteOne({googleId: user, _id: new mongodb.ObjectID(_id)}, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    ),
    addUserSub: (user, _id) => (
        new Promise((resolve, reject) => {
            userPosts.updateOne({_id: new mongodb.ObjectID(_id), user_id: user.email}, {$push: {items: {body: "Empty Item", ticked: false, editing: true}}}, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    ),
    removeUserSub: (user, _id, ind) => (
        new Promise((resolve, reject) => {
            const ID = new mongodb.ObjectID(_id)
            userPosts.findOne({_id: ID}, (err, data) => {
                let newArray = data.items.filter((sub, index) => index !== ind)
                err ? reject(err) : userPosts.updateOne({_id: ID}, {$set : {items: newArray}}, (err, data) => {
                    err ? reject(err) : resolve(data)
                })
            })
        })
    ),
    toggleTickSub: (user, _id, ind) => (
        new Promise((resolve, reject) => {
            //console.log(`Attempting to tick item in post with id: ${_id}`)
            const ID = new mongodb.ObjectID(_id)
            userPosts.findOne({_id: ID}, (err, data) => {
                let newArray = data.items.map((sub, index) => {
                    if(index === ind) {
                        if(sub.ticked === false) {
                            sub.ticked = true
                        } else {
                            sub.ticked = false
                        }
                    }
                    return sub
                })
                err ? reject(err) : userPosts.updateOne({_id: ID}, {$set : {items: newArray}}, (err, data) => {
                    err ? reject(err) : resolve(data)
                })
            })
        })
    ),
    toggleEditSub: (user, _id, ind) => (
        new Promise((resolve, reject) => {
            const ID = new mongodb.ObjectID(_id)
            userPosts.findOne({_id: ID}, (err, data) => {
                if(!data) reject("no post found")
                let newArray = data.items.map((sub, index) => {
                    if(index === ind) {
                        if(sub.editing === false) {
                            sub.editing = true
                        } else {
                            sub.editing = false
                        }
                    }
                    return sub
                })
                err ? reject(err) : userPosts.updateOne({_id: ID}, {$set : {items: newArray}}, (err, data) => {
                    err ? reject(err) : resolve(data)
                })
            })
        })
    ),
    editBodySub: (user, _id, ind, body) => (
        new Promise((resolve, reject) => {
            const ID = new mongodb.ObjectID(_id)
            const newBody = body;
            userPosts.findOne({_id: ID}, (err, data) => {
                if(!data) reject("no post found")
                let newArray = data.items.map((sub, index) => {
                    if(index === ind) {
                        sub.body = newBody;
                    }
                    return sub
                })
                err ? reject(err) : userPosts.updateOne({_id: ID}, {$set : {items: newArray}}, (err, data) => {
                    err ? reject(err) : resolve(data)
                })
            })
        })
    )
}