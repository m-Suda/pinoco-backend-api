import { check } from "express-validator/check";

// const isNotUsedIllegalCharacter = field => {
//     if (typeof field === 'undefined') {
//         return true;
//     }
//     return !field.match(/[<>"'&|%\\]/);
// };

export const bodyParams = [
    check('userId')
        .not().isEmpty()
        .withMessage('UserID is required')
    ,
    check('feedbackId')
        .not().isEmpty()
        .withMessage('FeedbackId is required')
    ,
];
