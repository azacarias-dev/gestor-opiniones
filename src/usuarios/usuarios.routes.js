import { Router } from 'express';
import { changeUserStatus, createUser, getUserById, getUsers, updateUser } from './usuarios.controller.js';
import { validateCreateUser,  validateUpdateUserRequest, validateFieldStatusChange, validateGetUserById } from '../../middlewares/usuarios-validator.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', validateCreateUser, createUser);

//Ruta para obtener todos los usuarios, obtener usuaris por id
router.get('/', getUsers);
router.get('/:id', validateGetUserById, getUserById);

// Ruta para actualizar un usuario
router.put('/:id', validateUpdateUserRequest, updateUser);

// Ruta para desactivar/activar un usuario
router.put('/:id/activar', validateFieldStatusChange, changeUserStatus);
router.put('/:id/desactivar', validateFieldStatusChange, changeUserStatus);
export default router;