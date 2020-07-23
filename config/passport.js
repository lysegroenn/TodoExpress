const passport = require('passport');
const usersCtrl = require('../src/api/users.controller');

const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.lysegroenn.com/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id, 
            displayName: profile.displayName
        }
        try {
            let user = await usersCtrl.findGoogleUser(profile.id)
            if(user) {
                done(null, user)
            } else {
                user = await usersCtrl.addGoogleUser(newUser)
                console.log(`Created user ${JSON.stringify(user)}`)
                done(null, user)
            }

        } catch (err) {
            console.error(err)
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.googleId);
      });
      
    passport.deserializeUser(async function(id, done) {
        //console.log(`deserialize called with id: ${id}`)
        user = await usersCtrl.findGoogleUser(id)
        done(null, user)
    });
}
