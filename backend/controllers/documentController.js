import Document from '../models/documentSchema.js';
import path from 'path';



export const getAllDocuments = async (req, res, next) => {
    try {
        const docs = await Document.find();

        res.status(200).json({
            message: 'List of Documents',
            data: docs
        });

    } catch (err) {
        next(err);
    }
}

export const addDocument = async (req, res, next) => {
    try {
        const { filename } = req.body;
        const file = req.file.path;
        const doc = await Document.create({ filename, file });
        res.status(201).json({
            message: 'Document added successfully',
            data: doc
        })
    } catch (err) {
        next(err)
    }
}

export const downloadFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Document.findById(id);
        //if the doc doesn't exist throw an error and stops execution
        if (!doc) {
            throw new Error('Document not found');
        }

        const file = doc.file;
        const filePath = path.join(__dirname, `../uploads${file}`);
        res.download(filePath);


    } catch (err) {
        next(err);
    }
}