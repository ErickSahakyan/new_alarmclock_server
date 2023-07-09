import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export interface IRequest extends Request {
    userId: string
}

export const checkAuth = async (req: IRequest, res: Response, next: NextFunction) =>  {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    const users = await  User.find()

    if(token){
        try {
            const decode = jwt.verify(token, 'sadanodwkmdasdawdqe2wdd v3 jf0i32j=0fjefksdljl') as any

            users.map(user => {
                if(user.id === decode.id){
                    req.userId = user.id
                }
            })

            next(); 
        } catch (error) {
            return res.json({
                message: 'Нет доступа!'
            })
        }
    }else {
        return res.json({
            message: 'Нет доступа!'
        })
    }
}