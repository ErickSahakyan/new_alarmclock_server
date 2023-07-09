import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';
import { IRequest } from '../utils/checkAuth';

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

const getUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            })
        };

        const token = jwt.sign({
            id: user._id
        }, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl', { expiresIn: '30d' });

        res.json({
            user,
            token
        })
    } catch (error) {
        Logging.error(error)
        res.status(500).json({
            message: 'Failed to log in'
        })
    }
};

const passwordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email}) 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        if(user){
            user.password = hash
            await user.save()
        }

        res.status(201).json({
            message: "Пароль успешно изменён!"
        })        
    } catch (error) {
        Logging.error(error)
        res.status(401).json({
            message: 'Error when changing the password!'
        })
    }
}

const userFind = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})

        res.json(user)
    } catch (error) {
        Logging.error(error)
        res.status(401).json({
            message: 'User nor found!'
        })
    }
}

export default { registrationUser, authorizationUser, getUser, userFind, passwordReset };


// google auth
// facebook auth


