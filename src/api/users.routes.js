const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersCtrl = require('./users.controller');
const postsCtrl = require('./posts.controller');
const { ensureAuth, ensureGuest } = require('../../middleware/auth')


router.get('/posts/', ensureAuth, postsCtrl.getUserPosts)
router.post('/userPosts/', ensureAuth, postsCtrl.addUserPost)
router.delete('/userPosts/', ensureAuth, postsCtrl.removeUserPost)
router.post('/userSub/', ensureAuth, postsCtrl.addUserSub)
router.delete('/userSub/', ensureAuth, postsCtrl.removeUserSub)
router.put('/tick/', ensureAuth, postsCtrl.toggleTickSub)
router.put('/editBody/',ensureAuth, postsCtrl.editBodySub)


module.exports = router;
