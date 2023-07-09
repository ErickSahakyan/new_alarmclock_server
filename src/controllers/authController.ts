import passport from 'passport';
import strategy from 'passport-facebook'
import User from '../models/User';


const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(obj: any, done) {
    done(null, obj);
});


passport.use(
    new FacebookStrategy(
        {
        clientID: '2238097013057424',
        clientSecret: '4b968f624168b8db253c02c60167b4ec',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ["email", "name"]
        },
        function(accessToken: any, refreshToken: any, profile: any, done: any) {
            const { email, first_name, last_name } = profile._json;
            const userData = {
                email,
                firstName: first_name,
                lastName: last_name
            };
            new User(userData).save();
            done(null, profile);
        }
    )
);
