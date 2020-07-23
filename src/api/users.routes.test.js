const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersCtrl = require('./users.controller');
const postsCtrl = require('./posts.controller.test');
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

router.get('/', (req, res) => res.send("hej"))


router.get('/posts/', postsCtrl.getUserPosts)
router.post('/userPosts/', postsCtrl.addUserPost)
router.delete('/userPosts/', postsCtrl.removeUserPost)
router.post('/userSub/', postsCtrl.addUserSub)
router.delete('/userSub/', postsCtrl.removeUserSub)
router.put('/tick/', postsCtrl.toggleTickSub)



module.exports = router;
