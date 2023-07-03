import Alarm from '../models/Alarm';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';
import User from '../models/User';

const createAlarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { time, text, condition } = req.body;

        const newAlarm = new Alarm({
            time,
            text,
            condition
        });

        await newAlarm.save();

        await User.findByIdAndUpdate(123, {
            $push: { alarms: newAlarm }
        });

        res.json(newAlarm);
    } catch (error) {
        Logging.error(error);
        res.status(402).json({
            message: 'Что-то пошло не так!'
        });
    }
};



// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};
// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};
// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};
// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};
// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};
// const createAlarm = async (req: Request, res: Response, next: NextFunction) => {};




export default { createAlarm };
