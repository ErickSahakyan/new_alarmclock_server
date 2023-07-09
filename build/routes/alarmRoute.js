"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const alarmController_1 = __importDefault(require("../controllers/alarmController"));
const checkAuth_1 = require("../utils/checkAuth");
const router = express_1.default.Router();
router.post('/create', checkAuth_1.checkAuth, alarmController_1.default.createAlarm);
router.get('/alarms', checkAuth_1.checkAuth, alarmController_1.default.getMyAlarms);
router.put('/toggle', alarmController_1.default.toggleCondition);
router.delete('/:id', checkAuth_1.checkAuth, alarmController_1.default.removeAlarm);
router.put('/:id', alarmController_1.default.changeAlarm);
router.post('/duplicate', checkAuth_1.checkAuth, alarmController_1.default.duplicateAlarm);
module.exports = router;
