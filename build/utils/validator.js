"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
exports.validator = [
    (0, express_validator_1.check)('email').normalizeEmail().isEmail().withMessage('Invalid Email!'),
    (0, express_validator_1.check)('password').trim().not().isEmail().withMessage('Password is empty!').isLength({ min: 8, max: 20 }).withMessage('Password must be to 8 to 20 characters long!')
];
function userValidation(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req).array();
    if (!result.length)
        return next();
    const error = result[0].msg;
    res.json({ success: false, message: error });
}
exports.default = userValidation;
