import User from './usuarios.model.js';

// Metodo para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuario creado exitosamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
}

// Metodo para obtener todos los usuarios
export const getUsers = async (req, res) => {
    try{
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = {isActive};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { creationDate: -1 }
        };

        const users = await User.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(options.sort);

        const total = await User.countDocuments(filter);
        res.status(200).json({
            status: 'success',
            message: 'Usuarios obtenidos exitosamente',
            data: users,
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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el usuario',
            error: error.message
        });
    } 
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado exitosamente',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }  
}

export const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activar');
        const action = isActive ? 'activado' : 'desactivado';
        const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario no encontrado para ${action}`
            });
        }

        res.status(200).json({
            status: 'success',
            message: `Usuario ${action} exitosamente`,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al cambiar el estado del usuario',
            error: error.message
        });
    }
}