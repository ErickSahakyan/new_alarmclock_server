import Alarm from '../models/Alarm';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import User from '../models/User';
import { IRequest } from '../utils/checkAuth';

const createAlarm = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { time, text, condition, weekday } = req.body;

        const newAlarm = new Alarm({
            time,
            text,
            condition, 
            weekday
        });

        await newAlarm.save();

        await User.findByIdAndUpdate(req.userId, {
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



const getMyAlarms = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId)
        let list;
        if(user) {
            list = await Promise.all(
                user.alarms.map(alarm => {
                    return Alarm.findById(alarm._id)
                })
            )
        }

        res.json(list)  
    } catch (error) {
        Logging.error(error);
        res.json({
            message: 'Что-то пошло не так!'
        })
    }
};




const toggleCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, condition } = req.body
        const alarm = await Alarm.findById(id)

        if(alarm) {
            alarm.condition = !alarm.condition
            await alarm.save()
        }

        res.json(alarm)
    } catch (error) {
        console.log(error)
        res.json({message: 'Что-то пошло не так!'})
    }
};


const removeAlarm = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const alarm = await Alarm.findByIdAndUpdate(id)

        if(!alarm) {
            return res.json({message: 'Такого будильника не существует'})
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: {alarms: id}
        })

        res.json({id, message: 'Будильник был удалён!'})
    } catch (error) {
        res.json({message: 'Не удалось удалить будильник!'})
    }
};



const changeAlarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {time, text, condition, weekday} = req.body;
        const alarm = await Alarm.findById(req.params.id)

        if(alarm) {
            alarm.time = time;
            alarm.text = text;
            alarm.condition = condition;
            alarm.weekday = weekday

            await alarm.save()
        }

        

        res.json(alarm)
    } catch (error) {
        res.status(402).json({
            message: 'Не удалось обновить данные!'
        })
    }
};



const duplicateAlarm = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const {time, text, condition} = req.body;

        const newAlarm = new Alarm({
            time,
            text,
            condition
        })

        await newAlarm.save();

        await User.findByIdAndUpdate(req.userId, {
            $push: {alarms: newAlarm}
        });

        res.json(newAlarm)
    } catch (error) {
        res.status(402).json({
            message: 'Не удалось осуществить дублирование будильника! '
        })
    }
};




export default { createAlarm, getMyAlarms, toggleCondition, removeAlarm, changeAlarm, duplicateAlarm };
