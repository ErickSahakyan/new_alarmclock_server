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
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    const users = yield User_1.default.find();
    if (token) {
        try {
            const decode = jsonwebtoken_1.default.verify(token, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl');
            users.map(user => {
                if (user.id === decode.id) {
                    req.userId = user.id;
                }
            });
            next();
        }
        catch (error) {
            return res.json({
                message: 'Нет доступа!'
            });
        }
    }
    else {
        return res.json({
            message: 'Нет доступа!'
        });
    }
});
exports.checkAuth = checkAuth;
