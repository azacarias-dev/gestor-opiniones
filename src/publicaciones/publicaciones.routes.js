import { Router } from "express";
import { changePublicationStatus, createPublication, getPublicationById, getPublications, updatePublication } from "./publicaciones.controller.js";

const router = Router();

// Ruta para crear una nueva publicación
router.post('/', createPublication);

// Ruta para obtener todas las publicaciones
router.get('/', getPublications);
router.get('/:id', getPublicationById);

//Ruta para actualizar una publicación
router.put('/:id', updatePublication);

// Ruta para desactivar/activar una publicación
router.put('/:id/activar', changePublicationStatus);
router.put('/:id/desactivar', changePublicationStatus);

export default router;