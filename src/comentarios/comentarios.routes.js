import { Router } from 'express';
import { changeCommentStatus, createComment, getCommentById, getComments, updateComment } from './comentarios.controller.js';

const router = Router();
// Ruta para crear un nuevo comentario
router.post('/', createComment);

router.get('/', getComments);
router.get('/:id', getCommentById);

router.put('/:id', updateComment);

router.put('/:id/activar', changeCommentStatus);
router.put('/:id/desactivar', changeCommentStatus);

export default router;