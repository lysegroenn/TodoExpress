const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersCtrl = require('./users.controller');
const postsCtrl = require('./posts.controller');
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

router.get('/', (req, res) => {
    //console.log('COOKIES:---------------------------------- ')
    //console.log(req.user)
    //res.json({msg: req.session})
    //res.redirect('/api/users/createtest')
    res.json({msg: "Hej"})
})

router.get('/createtest/', (req, res) => {
    console.log(req.sessionID)
    res.json({msg: req.session})
})



router.get('/posts/', ensureAuth, postsCtrl.getUserPosts)
router.post('/userPosts/', ensureAuth, postsCtrl.addUserPost)
router.delete('/userPosts/', ensureAuth, postsCtrl.removeUserPost)
router.post('/userSub/', ensureAuth, postsCtrl.addUserSub)
router.delete('/userSub/', ensureAuth, postsCtrl.removeUserSub)
router.put('/tick/', ensureAuth, postsCtrl.toggleTickSub)

// Test route - to be deleted
router.get('/test/', postsCtrl.getUserPosts)


module.exports = router;
