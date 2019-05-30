import { check } from "express-validator/check";

const isNotUsedIllegalCharacter = field => {
    if (typeof field === 'undefined') {
        return true;
    }
    return !field.match(/[<>"'&|%\\]/);
};

export const bodyParams = [
    check('userId')
        .custom(userId => {
            return isNotUsedIllegalCharacter(userId);
        }).withMessage('Using the wrong String in UserId')
    ,
];
