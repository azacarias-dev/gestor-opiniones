'use strict';

import mongoose, { mongo } from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idPublicacion: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Publication',
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comment', commentSchema);