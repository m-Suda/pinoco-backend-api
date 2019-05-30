import { check } from "express-validator/check";

const isNotUsedIllegalCharacter = field => {
    if (typeof field === 'undefined') {
        return true;
    }
    return !field.match(/[<>"'&|%\\]/);
};

const isFlagTypeValid = field => {
    if (typeof field === 'undefined') {
        return true;
    }
    return field === 0 || field === 1;
};

export const bodyParams = [
    check('roleId')
        .not().isEmpty()
        .withMessage('UserRole is required')
    ,
    check('roleId')
        .custom(userRole => {
            return isNotUsedIllegalCharacter(userRole);
        }).withMessage('Using the wrong String in UserRole')
    ,
    check('canCreateUser')
        .custom(canCreateUser => {
            return isFlagTypeValid(canCreateUser);
        }).withMessage('Using the wrong String in CanCreateUser')
    ,
    check('canUpdateUser')
        .custom(canUpdateUser => {
            return isFlagTypeValid(canUpdateUser);
        }).withMessage('Using the wrong String in CanUpdateUser')
    ,
    check('canDeleteUser')
        .custom(canDeleteUser => {
            return isFlagTypeValid(canDeleteUser);
        }).withMessage('Using the wrong String in CanDeleteUser')
    ,
    check('canCreateCompany')
        .custom(canCreateCompany => {
            return isFlagTypeValid(canCreateCompany);
        }).withMessage('Using the wrong String in CanCreateCompany')
    ,
    check('canUpdateCompany')
        .custom(canUpdateCompany => {
            return isFlagTypeValid(canUpdateCompany);
        }).withMessage('Using the wrong String in CanUpdateCompany')
    ,
    check('canDeleteCompany')
        .custom(canCreateUser => {
            return isFlagTypeValid(canCreateUser);
        }).withMessage('Using the wrong String in CanDeleteCompany')
    ,
    check('canManageAttendance')
        .custom(canManageAttendance => {
            return isFlagTypeValid(canManageAttendance);
        }).withMessage('Using the wrong String in CanManageAttendance')
    ,
    check('canRegisterAttendance')
        .custom(canRegisterAttendance => {
            return isFlagTypeValid(canRegisterAttendance);
        }).withMessage('Using the wrong String in CanRegisterAttendance')
    ,
    check('canCreateRole')
        .custom(canCreateRole => {
            return isFlagTypeValid(canCreateRole);
        }).withMessage('Using the wrong String in CanCreateRole')
    ,
    check('canUpdateRole')
        .custom(canUpdateRole => {
            return isFlagTypeValid(canUpdateRole);
        }).withMessage('Using the wrong String in CanUpdateRole')
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
