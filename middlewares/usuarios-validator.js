import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail(),

    body('bio')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('La biografía no puede superar los 250 caracteres'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/)
        .withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe contener al menos un número'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano'),
    checkValidators,
];

export const validateUpdateUserRequest = [
    param('id')
        .isMongoId()
        .withMessage('El id no es válido'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail(),

    body('bio')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('La biografía no puede superar los 250 caracteres'),

    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano'),
    checkValidators,
];

export const validateFieldStatusChange = [
    param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId valido de mongoDB'),
    checkValidators,
];

export const validateGetUserById = [
    param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId valido de mongoDB'),
    checkValidators,
];