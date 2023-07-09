import { NextFunction, Request, Response } from 'express'
import {check, validationResult} from 'express-validator'
import Logging from '../library/Logging'

export const validator = [
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email!'),
    check('password').trim().not().isEmail().withMessage('Password is empty!').isLength({min: 8, max: 20}).withMessage('Password must be to 8 to 20 characters long!')
]


export default function userValidation (req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}