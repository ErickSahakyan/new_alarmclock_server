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
const Alarm_1 = __importDefault(require("../models/Alarm"));
const Logging_1 = __importDefault(require("../library/Logging"));
const User_1 = __importDefault(require("../models/User"));
const createAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { time, text, condition, weekday } = req.body;
        const newAlarm = new Alarm_1.default({
            time,
            text,
            condition,
            weekday
        });
        yield newAlarm.save();
        yield User_1.default.findByIdAndUpdate(req.userId, {
            $push: { alarms: newAlarm }
        });
        res.json(newAlarm);
    }
    catch (error) {
        Logging_1.default.error(error);
        res.status(402).json({
            message: 'Что-то пошло не так!'
        });
    }
});
const getMyAlarms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        let list;
        if (user) {
            list = yield Promise.all(user.alarms.map(alarm => {
                return Alarm_1.default.findById(alarm._id);
            }));
        }
        res.json(list);
    }
    catch (error) {
        Logging_1.default.error(error);
        res.json({
            message: 'Что-то пошло не так!'
        });
    }
});
const toggleCondition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, condition } = req.body;
        const alarm = yield Alarm_1.default.findById(id);
        if (alarm) {
            alarm.condition = !alarm.condition;
            yield alarm.save();
        }
        res.json(alarm);
    }
    catch (error) {
        console.log(error);
        res.json({ message: 'Что-то пошло не так!' });
    }
});
const removeAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const alarm = yield Alarm_1.default.findByIdAndUpdate(id);
        if (!alarm) {
            return res.json({ message: 'Такого будильника не существует' });
        }
        yield User_1.default.findByIdAndUpdate(req.userId, {
            $pull: { alarms: id }
        });
        res.json({ id, message: 'Будильник был удалён!' });
    }
    catch (error) {
        res.json({ message: 'Не удалось удалить будильник!' });
    }
});
const changeAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { time, text, condition, weekday } = req.body;
        const alarm = yield Alarm_1.default.findById(req.params.id);
        if (alarm) {
            alarm.time = time;
            alarm.text = text;
            alarm.condition = condition;
            alarm.weekday = weekday;
            yield alarm.save();
        }
        res.json(alarm);
    }
    catch (error) {
        res.status(402).json({
            message: 'Не удалось обновить данные!'
        });
    }
});
const duplicateAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { time, text, condition } = req.body;
        const newAlarm = new Alarm_1.default({
            time,
            text,
            condition
        });
        yield newAlarm.save();
        yield User_1.default.findByIdAndUpdate(req.userId, {
            $push: { alarms: newAlarm }
        });
        res.json(newAlarm);
    }
    catch (error) {
        res.status(402).json({
            message: 'Не удалось осуществить дублирование будильника! '
        });
    }
});
exports.default = { createAlarm, getMyAlarms, toggleCondition, removeAlarm, changeAlarm, duplicateAlarm };
