import { check } from "express-validator/check";

const isNotUsedIllegalCharacter = field => {
    if (typeof field === 'undefined') {
        return true;
    }
    return !field.match(/[<>"'&|%\\]/);
};

export const bodyParams = [
    check('companyId')
        .not().isEmpty()
        .withMessage('CompanyId is required')
    ,
    check('companyId')
        .custom(companyId => {
            return isNotUsedIllegalCharacter(companyId);
        }).withMessage('Using the wrong String in CompanyId')
    ,
    check('companyName')
        .custom(companyName => {
            return isNotUsedIllegalCharacter(companyName);
        }).withMessage('Using the wrong String in CompanyName')
    ,
    check('createUser')
        .custom(createUser => {
            return isNotUsedIllegalCharacter(createUser);
        }).withMessage('Using the wrong String in CreateUser')
    ,
    check('updateUser')
        .custom(updateUser => {
            return isNotUsedIllegalCharacter(updateUser);
        }).withMessage('Using the wrong String in UpdateUser')
    ,
];
