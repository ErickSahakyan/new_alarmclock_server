import express from 'express';
import passport from "passport";
// import {authController} from '../controllers/authController'


const authRouter = express.Router();

// router.get('/facebook', authController.authFacebook)
// router.get('/google', authController.authGoogle)



authRouter.get("/facebook", passport.authenticate("facebook"));

authRouter.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/fail"
    })
);

authRouter.get("/fail", (req, res) => {
    res.send("Failed attempt");
});

authRouter.get("/", (req, res) => {
    res.send("Success");
});


export default authRouter;
