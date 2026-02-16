import { Router } from 'express';
import { changeUserStatus, createUser, getUserById, getUsers, updateUser } from './usuarios.controller.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', createUser);

//Ruta para obtener todos los usuarios, obtener usuaris por id
router.get('/', getUsers);
router.get('/:id', getUserById);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);

// Ruta para desactivar/activar un usuario
router.put('/:id/activar', changeUserStatus);
router.put('/:id/desactivar', changeUserStatus);
export default router;