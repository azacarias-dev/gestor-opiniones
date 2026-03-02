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

export const getComments = async (req, res) => {
    try{
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = {isActive};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { creationDate: -1 }
        };

        const comment = await Comment.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(options.sort);

        const total = await Comment.countDocuments(filter);
        res.status(200).json({
            status: 'success',
            message: 'Comentario obtenidos exitosamente',
            data: comment,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                limit
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comentario no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Comentario obtenido exitosamente',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el comentario',
            error: error.message
        });
    } 
}

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const commentData = req.body;
        const comment = await Comment.findByIdAndUpdate(id, commentData, { new: true });
        
        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comentario no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Comentario actualizado exitosamente',
            data: comment
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el comentario',
            error: error.message
        });
    }  
}

export const changeCommentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activar');
        const action = isActive ? 'activado' : 'desactivado';
        const comment = await Comment.findByIdAndUpdate(id, { isActive }, { new: true });
        
        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: `Comentario no encontrado para ${action}`
            });
        }

        res.status(200).json({
            status: 'success',
            message: `Comentario ${action} exitosamente`,
            data: comment
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al cambiar el estado del usuario',
            error: error.message
        });
    }
}
