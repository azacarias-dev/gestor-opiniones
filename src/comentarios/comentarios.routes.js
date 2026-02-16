import { Router } from 'express';
import { createComment } from './comentarios.controller.js';

const router = Router();
// Ruta para crear un nuevo comentario
router.post('/', createComment);

export default router;