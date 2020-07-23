const postsDAO = require('../dao/postsDAO');
const UsersDAO = require('../dao/usersDAO');
const User = require('./users.controller').User;

const SecretKey = process.env.SECRET_KEY;


module.exports = {
	getUserPosts: async (req, res) => {
		try {
			console.log(`Got getUserPosts request`)
			if(req.user.googleId !== '') {
				const posts = await postsDAO.getUserPosts(req.user.googleId)
				res.status(200).json({posts, user: req.user})	
			} else {
				res.status(404)
			}		
		} catch (e) {
			console.log({ e: e + " hej" })
			res.status(500).json({msg: "Something went wrong..."})
		}
	},
	addUserPost: async (req, res) => {
		let user = req.user.googleId;
		let { title } = req.body;
		//console.log(``)
		try {
			const addPostResult = await postsDAO.addUserPost(user, title)
			//console.log(addPostResult.result)
			res.status(201).json({ success: true})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false})
		}
	},
	removeUserPost: async (req, res) => {
		let user = req.user.googleId;
		let { _id } = req.body;
		//console.log(``)
		try {
			const removePostResult = await postsDAO.removeUserPost(user, _id)
			//console.log(removePostResult.result)
			res.status(202).json({ success: true})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false})
		}
	},
	addUserSub: async (req, res) => {
		let user = req.user.googleId;
		let { _id } = req.body;
		try {
			const addSubResult = await postsDAO.addUserSub(user, _id)
			//console.log(addSubResult.result.nModified)
			res.status(200).json({ success: true})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false})
		}
	},
	removeUserSub: async (req, res) => {
		let user = req.user.googleId;
		let { _id, ind } = req.body;
		try {
			const removeSubResult = await postsDAO.removeUserSub(user, _id, ind)
			//console.log(removeSubResult.result.nModified)
			res.status(200).json({ success: true})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false})
		}
	},
	toggleTickSub: async (req, res) => {
		let user = req.user.googleId;
		let { _id, ind } = req.body;
		try {
			const tickSubResult = await postsDAO.toggleTickSub(user, _id, ind)
			//console.log(tickSubResult.result.nModified)
			res.status(200).json({ success: true})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false})
		}
	}
}