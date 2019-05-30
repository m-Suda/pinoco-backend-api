import { check } from "express-validator/check";

const isNotUsedIllegalCharacter = field => {
    if (typeof field === 'undefined') {
        return true;
    }
    return !field.match(/[<>"'&|%\\]/);
};

export const bodyParams = [
    check('userId')
        .not().isEmpty()
        .withMessage('UserId is required')
    ,
    check('userId')
        .custom(userId => {
            return isNotUsedIllegalCharacter(userId);
        }).withMessage('Using the wrong String in UserId')
    ,
    check('companyId')
        .custom(companyId => {
            return isNotUsedIllegalCharacter(companyId);
        }).withMessage('Using the wrong String in CompanyId')
    ,
    check('roleId')
        .custom(userRole => {
            return isNotUsedIllegalCharacter(userRole);
        }).withMessage('Using the wrong String in UserRole')
    ,
    check('userName')
        .custom(userName => {
            return isNotUsedIllegalCharacter(userName);
        }).withMessage('Using the wrong String in UserName')
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
