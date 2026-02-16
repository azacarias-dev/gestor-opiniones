import Publication from './publicaciones.model.js';

// Metodo para crear una nueva publicación
export const createPublication = async (req, res) => {
    try {
        const publicationData = req.body;
        const {idUsuario} = req.body;

        if (!idUsuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan campos requeridos: idUsuario'
            });
        }

        const usuarioId = Publication.findById(idUsuario);
        if (!usuarioId) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        
        const publication = new Publication(publicationData);
        await publication.save();
        res.status(201).json({
            status: 'success',
            message: 'Publicación creada exitosamente',
            data: publication
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la publicación',
            error: error.message
        });
    }
}

export const getPublications = async (req, res) => {
    try{
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = {isActive};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { creationDate: -1 }
        };

        const publications = await Publication.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(options.sort);

        const total = await Publication.countDocuments(filter);
        res.status(200).json({
            status: 'success',
            message: 'Publicaciones obtenidas exitosamente',
            data: publications,
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
            message: 'Error al obtener las publicaciones',
            error: error.message
        });
    }
}

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                status: 'error',
                message: 'Publicación no encontrada'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Publicación obtenida exitosamente',
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la publicación',
            error: error.message
        });
    } 
}

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publicationData = req.body;
        const publication = await Publication.findByIdAndUpdate(id, publicationData, { new: true });
        
        if (!publication) {
            return res.status(404).json({
                status: 'error',
                message: 'Publicación no encontrada'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Publicación actualizada exitosamente',
            data: publication
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la publicación',
            error: error.message
        });
    }  
}

export const changePublicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activar');
        const action = isActive ? 'activado' : 'desactivado';
        const publication = await Publication.findByIdAndUpdate(id, { isActive }, { new: true });
        
        if (!publication) {
            return res.status(404).json({
                status: 'error',
                message: `Publicación no encontrada para ${action}`
            });
        }

        res.status(200).json({
            status: 'success',
            message: `Publicación ${action} exitosamente`,
            data: publication
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al cambiar el estado de la publicación',
            error: error.message
        });
    }
}