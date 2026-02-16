import Comment from './comentarios.model.js';

export const createComment = async (req, res) => {
    try {
        const commentData = req.body;
        const {idUsuario, idPublicacion} = req.body;

        if (!idUsuario || !idPublicacion) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan campos requeridos: idUsuario o idPublicacion'
            });
        }

        const usuarioId = Comment.findById(idUsuario);
        if (!usuarioId) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        if (!idPublicacion) {
            return res.status(404).json({
                status: 'error',
                message: 'Publicación no encontrada'
            });
        }

        const comment = new Comment(commentData);
        await comment.save();
        res.status(201).json({
            status: 'success',
            message: 'Comentario creado exitosamente',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el comentario',
            error: error.message
         });
    }
}
