"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logging_1 = __importDefault(require("../library/Logging"));
const registrationUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isUsed = yield User_1.default.findOne({ email });
        if (isUsed) {
            return res.json({
                message: 'Данный пользователь уже занят!'
            });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(password, salt);
        const newUser = new User_1.default({
            email,
            password: hash
        });
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id
        }, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl', { expiresIn: '30d' });
        yield newUser.save();
        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно!'
        });
    }
    catch (error) {
        Logging_1.default.error(error);
        res.json();
    }
});
const authorizationUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль или имя пользователя!'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl', { expiresIn: '30d' });
        res.json({
            token,
            user,
            message: 'Вы вошли в систему!'
        });
    }
    catch (error) {
        res.json({
            message: 'Ошибка при авторизации!'
        });
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует'
            });
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl', { expiresIn: '30d' });
        res.json({
            user,
            token
        });
    }
    catch (error) {
        Logging_1.default.error(error);
        res.status(500).json({
            message: 'Failed to log in'
        });
    }
});
const passwordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        Logging_1.default.error(error);
        res.status(401).json({
            message: 'Failed to reset fro password!'
        });
    }
});
const userFind = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.json({ message: 'Такого пользователя не существует!' });
        }
        res.json(user);
    }
    catch (error) {
        Logging_1.default.error(error);
        res.status(401).json({
            message: 'User nor found!'
        });
    }
});
exports.default = { registrationUser, authorizationUser, getUser, userFind };
// password reset
// password change
// google auth
// facebook auth
