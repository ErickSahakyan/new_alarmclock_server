import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';

const registrationUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const isUsed = await User.findOne({ email });

        if (isUsed) {
            return res.json({
                message: 'Данный пользователь уже занят!'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: newUser._id
            },
            'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl',
            { expiresIn: '30d' }
        );

        await newUser.save();

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно!'
        });
    } catch (error) {
        Logging.error(error);
        res.json();
    }
};

const authorizationUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль или имя пользователя!'
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl',
            { expiresIn: '30d' }
        );

        res.json({
            token,
            user,
            message: 'Вы вошли в систему!'
        });
    } catch (error) {
        res.json({
            message: 'Ошибка при авторизации!'
        });
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find();
        console.log(user);
        // if (!user) {
        //     return res.json({
        //         message: 'Такого пользователя не существует'
        //     });
        // }

        // const token = jwt.sign(
        //     {
        //         id: user._id
        //     },
        //     'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl',
        //     { expiresIn: '30d' }
        // );

        // res.json({
        //     user,
        //     token
        // });
    } catch (error) {
        Logging.error(error);
        res.json({
            message: 'Ошибка при получении пользователя'
        });
    }
};

export default { registrationUser, authorizationUser, getUser };

// email verification
// password reset
// password change

// google auth
// facebook auth
