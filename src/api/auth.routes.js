const express = require('express');
const passport = require('passport');
const router = express.Router();


// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google',{ scope: ['profile']}))


// @desc Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }),
(req, res) => {
    //console.log(req.session)
    //console.log('Redirecting back to React App with user: ' + req.user.displayName)
    res.redirect('http://www.lysegroenn.com')
    //res.redirect('/api/users/')
})


// @desc Logout user
// @route GET /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.status(204).json({ success: true })
    //res.status.redirect('http://localhost:8080')
})

module.exports = router;